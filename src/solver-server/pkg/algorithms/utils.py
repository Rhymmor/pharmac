import sys, json
import numpy as np
from scipy.integrate import odeint

def is_array(obj):
    obj_type = type(obj)
    return obj_type is list or obj_type is np.ndarray

def safe_get(obj, func, default=None):
    try:
        return func(obj)
    except:
        return default

def model_eval(funcs, t, params_dict, parser):
    return parser.eval(funcs, params_dict)

class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        else:
            return super(NumpyEncoder, self).default(obj)

def min_func(q, data, y0, space, param_keys, parser):
    res = 0.0
    params_dict = get_dict(param_keys, q)
    sol = odeint(model_eval, y0, space, args=(params_dict, parser))
    step = (len(space) - 1) / float(space[-1])
    for  points, idx in zip(data['data'], range(len(data['data']))):
        for time, point in zip(data['t'], points):
            res += (point - sol[int(time * step), idx]) ** 2
    return res

def get_dict(keys, values):
    dictionary = {}
    for key, value in zip(keys, values):
        dictionary[key] = value
    return dictionary