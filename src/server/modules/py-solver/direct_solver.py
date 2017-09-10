import json
from model_parser import ModelParser
from scipy.integrate import odeint
from utils import read_in, model_eval, NumpyEncoder
import numpy as np

def main():
    model = read_in()
    if (model is not None):
        parser = ModelParser(model['model'])
        options = model['options']
        points_count = options['points']
        linspace = np.linspace(1, options['interval'], points_count)
        params_dict = model['parameters']
        y0 = model['initialValues']
        sol = odeint(model_eval, y0, linspace, args=(params_dict, parser))

        print json.dumps({'solution': sol}, cls=NumpyEncoder)

if __name__ == '__main__':
    main()