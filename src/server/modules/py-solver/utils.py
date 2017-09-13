import sys, json
import numpy as np

def safe_get(obj, func, default=None):
    try:
        return func(obj)
    except:
        return default

def read_in():
    model = sys.stdin.readlines()
    return json.loads(model[0])

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