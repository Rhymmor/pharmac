from ..model_parser import ModelParser
from ..utils import read_in, model_eval, NumpyEncoder, min_func

def solve_monte_carlo(model):
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
    synth_data_points_count = 10 #data_opt['dataPoints']
    inverse_data = get_synth_data(y0, params_dict, synth_data_points_count, space, parser)

    method = 'nelder-mead'
    method_options = {'xtol': 1e-8}
    result = minimize(min_func, params_dict.values(), method=method,
                        args=(inverse_data, y0, space, params_dict.keys(), parser),
                        options=method_options)

    return result