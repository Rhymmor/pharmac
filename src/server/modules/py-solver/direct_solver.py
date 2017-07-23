import json
from model_parser import ModelParser
from scipy.integrate import odeint
from utils import read_in, model_eval, NumpyEncoder
import numpy as np

def main():
    model = read_in()
    if (model is not None):
        parser = ModelParser(model['model'])
        points_count = model['options']['points']
        t = np.linspace(0, model['options']['interval'], points_count)
        params_dict = model['parameters']
        sol = odeint(model_eval, model['initialValues'], t, args=(params_dict, parser))
        print json.dumps({'solution': sol}, cls=NumpyEncoder)

if __name__ == '__main__':
    main()