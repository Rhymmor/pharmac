import time
import json
from scipy.optimize import minimize
import numpy as np
import numpy.linalg as ln
from scipy.integrate import odeint
from ..model_parser import ModelParser
from ..utils import read_in, model_eval, NumpyEncoder, safe_get, get_dict, min_func

def get_solution_subspace(sol, count, space):
    if sol is None or len(sol) == 0:
        raise Exception('Error while trying generate synthetic data', 'No direct problem solution')
    subspace = []
    data = []
    for i in range(len(sol[0])):
        data.append([])
    step = (len(sol) - 1) // count
    for i in range(count):
        point = step * (i + 1)
        for j in range(len(sol[0])):
            data[j].append(sol[point][j])
        subspace.append(space[point])
    return {'t': subspace, 'data': data}

def get_synth_data(y0, params, points_count, space, parser):
    sol = odeint(model_eval, y0, space, args=(params, parser))
    return get_solution_subspace(sol, points_count, space)

def prepare_data_values(exp_data):
    values = []
    for i in range(len(exp_data[0]['value'])):
        values.append([])
    for point in exp_data:
        for idx, value in zip(range(len(point['value'])), point['value']):
            values[idx].append(value)
    return values

def prepare_experimental_data(exp_data):
    data = {}
    if len(exp_data) == 0:
        raise Exception('Experimental data is empty')

    data['t'] = [float(x['time']) for x in exp_data]
    data['data'] = prepare_data_values(exp_data)
    return data

def get_options():
    return {
        "nelder-mead": {'xtol': 1e-8},
        "BFGS": {},
        'Powell': {'xtol': 1e-8},
        'CG': {},
        'L-BFGS-B': {},
        'TNC': {},
        'COBYLA': {},
        'SLSQP': {},
        'dogleg': {},
        'trust-ncg': {}
    }

def is_array(obj):
    obj_type = type(obj)
    return obj_type is list or obj_type is np.ndarray

def prepare_solution(sol):
    return sol if is_array(sol) else [sol]

def solve_inverse(model):
        start_time = time.time()

        parser = ModelParser(model['model'])
        options = model['options']
        data_opt = options['dataOptions']

        points_count = options['points']
        interval = options['interval']
        y0 = model['initialValues']
        params_dict = model['parameters']
        data_selection = data_opt['dataSelection']

        space = np.linspace(0, interval, points_count)
        inverse_data = {}
        if data_selection == 'Synthetic':
            synth_params = options['syntheticParameters']
            synth_data_points_count = data_opt['dataPoints']
            inverse_data = get_synth_data(y0, synth_params, synth_data_points_count, space, parser)
        elif data_selection == 'Experimental':
            inverse_data = prepare_experimental_data(data_opt['data'])
        else:
            raise Exception('Wrong data selection method type')

        method = options['method']
        method_options = get_options()[method]
        result = minimize(min_func, params_dict.values(), method=method,
                          args=(inverse_data, y0, space, params_dict.keys(), parser),
                          options=method_options)

        # print result
        return {
            'solution': get_dict(params_dict.keys(), prepare_solution(result.x.tolist())),
            'parameters': {
                'nfev': safe_get(result, lambda x: x['nfev']),
                'nit': safe_get(result, lambda x: x['nit']),
                'fun': safe_get(result, lambda x: x['fun']),
                'time': time.time() - start_time
            }
        }