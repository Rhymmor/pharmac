import json
from scipy.integrate import odeint
import numpy as np
from .utils import model_eval, NumpyEncoder
from .model_parser import ModelParser

def direct_solver(model):
    parser = ModelParser(model['model'])
    options = model['options']
    points_count = options['points']
    linspace = np.linspace(1, options['interval'], points_count)
    params_dict = model['parameters']
    y0 = model['initialValues']
    sol = odeint(model_eval, y0, linspace, args=(params_dict, parser))

    # print json.dumps({'solution': sol}, cls=NumpyEncoder)
    return {'solution': sol}