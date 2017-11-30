from time import time
import numpy as np
from ..model_parser import ModelParser
from ..utils import model_eval, NumpyEncoder, min_func
from ..inverse_problem.inverse_problem import get_synth_data
from scipy.optimize import minimize


def find_solution(params_dict, y0, options, parser):
    points_count = options['points']
    interval = options['interval']
    space = np.linspace(0, interval, points_count)
    synth_data_points_count = 10
    inverse_data = get_synth_data(y0, params_dict, synth_data_points_count, space, parser)

    method = 'nelder-mead'
    method_options = {'xtol': 1e-8}
    return minimize(min_func, list(params_dict.values()), method=method,
                        args=(inverse_data, y0, space, params_dict.keys(), parser),
                        options=method_options)

def solve_monte_carlo(model):
    start_time = time()
    print()
    print(model)
    print()
    parser = ModelParser(model['model'])
    options = model['options']

    points_count = options['points']
    interval = options['interval']
    y0 = model['initialValues']
    params_dict = model['parameters']

    space = np.linspace(0, interval, points_count)
    synth_data_points_count = 10 #options['dataOptions']['dataPoints']
    inverse_data = get_synth_data(y0, params_dict, synth_data_points_count, space, parser)
    percent = 5
    print(inverse_data)

    method = 'nelder-mead'
    method_options = {'xtol': 1e-8}
    result = minimize(min_func, list(params_dict.values()), method=method,
                        args=(inverse_data, y0, space, params_dict.keys(), parser),
                        options=method_options)
    print(result.x.tolist())
    return result