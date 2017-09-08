import json
from scipy.optimize import minimize
import numpy as np
import numpy.linalg as ln
from scipy.integrate import odeint
# hack to allow relative exports
if __name__ == '__main__':
    if __package__ is None:
        import sys
        from os import path
        sys.path.append( path.dirname( path.dirname( path.abspath(__file__) ) ) )
        from model_parser import ModelParser
        from utils import read_in, model_eval, NumpyEncoder
    else:
        from ..model_parser import ModelParser
        from ...utils import read_in, model_eval, NumpyEncoder

def get_dict(keys, values):
    dictionary = {}
    for key, value in zip(keys, values):
        dictionary[key] = value
    return dictionary

def get_solution_subspace(sol, count, space):
    if sol is None or len(sol) == 0:
        return
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

def min_func(q, data, y0, space, param_keys, parser):
    res = 0.0
    params_dict = get_dict(param_keys, q)
    sol = odeint(model_eval, y0, space, args=(params_dict, parser))
    step = (len(space) - 1) / float(space[-1])
    for  points, idx in zip(data['data'], range(len(data['data']))):
        for time, point in zip(data['t'], points):
            res += (point - sol[int(time * step), idx]) ** 2
    return res

def main():
    model = read_in()
    if model is not None:
        parser = ModelParser(model['model'])
        points_count = model['options']['points']
        interval = model['options']['interval']
        space = np.linspace(0, interval, points_count)
        y0 = model['initialValues']
        params_dict = model['parameters']
        synth_params = {}
        try:
            synth_params = model['options']['syntheticParameters']
        except:
            None

        synth_data_points_count = 10    #TODO: remove harcode
        synth = get_synth_data(y0, synth_params, synth_data_points_count, space, parser)

        method = 'nelder-mead'  #TODO: remove hardcode
        result = minimize(min_func, params_dict.values(), method=method,  args=(synth, y0, space, params_dict.keys(), parser),
               options={'xtol': 1e-8})
        
        print json.dumps({'solution': get_dict(params_dict.keys(), result.x)}, cls=NumpyEncoder)

if __name__ == '__main__':
    main()