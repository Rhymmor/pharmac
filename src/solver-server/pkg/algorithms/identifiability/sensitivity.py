import json
import numpy as np
from scipy.integrate import odeint
from ..utils import model_eval, NumpyEncoder

def sens_value(sol, par, delta_x, delta_y):
    if sol != 0 and delta_x != 0:
        return par / sol * (delta_y) / (2 * delta_x)
    else:
        return float('Inf')

def find_sensitivity(funcs, y0, t, params, delta, parser):
    sol = odeint(funcs, y0, t, args=(params, parser))
    sens_list = {}
    for key, value in params.items():
        params_delta_p = params.copy()
        params_delta_m = params.copy()
        params_delta_p[key] = value + delta
        params_delta_m[key] = value - delta

        sol_delta_p = odeint(funcs, y0, t, args=(params_delta_p, parser))
        sol_delta_m = odeint(funcs, y0, t, args=(params_delta_m, parser))

        sens_param = 0.0
        for i in range(len(y0)):
            def sens_sum(k):
                diff = sol_delta_p[k][i] - sol_delta_m[k][i]
                return sens_value(sol[k][i], value, delta, diff) ** 2
            sens_param += sum([sens_sum(k) for k in range(len(sol)) if sol[k][i] != 0])

        sens_list[key] = sens_param
    return sens_list

def solve_sensitivity(model, ModelParser):
    parser = ModelParser(model['model'])
    points_count = model['options']['points']
    t = np.linspace(0, model['options']['interval'], points_count)
    params_dict = model['parameters']
    delta = 0.00001     #TODO: remove hardcode
    result = find_sensitivity(model_eval, model['initialValues'], t, params_dict, delta, parser)
    return {'solution': result}
