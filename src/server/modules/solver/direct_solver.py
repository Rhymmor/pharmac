import sys, json
from model_parser import ModelParser
from scipy.integrate import odeint
import numpy as np

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

def read_in():
    model = sys.stdin.readlines()
    # Since our input would only be having one line, parse our JSON data from that
    #print model
    return json.loads(model[0])

def model_eval(funcs, t, params_dict, parser):
    return parser.eval(funcs, params_dict)

def main():
    model = read_in()
    if (model is not None):
        print model
        parser = ModelParser(model['model'])
        points_count = 1001
        t = np.linspace(0, model['interval'], points_count)
        params_dict = {}
        sol = odeint(model_eval, model['initialValues'], t, args=(params_dict, parser))
        print json.dumps({'solution': sol}, cls=NumpyEncoder)

if __name__ == '__main__':
    main()