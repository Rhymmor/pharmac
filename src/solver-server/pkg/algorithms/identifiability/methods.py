from .sensitivity import solve_sensitivity
from .monte_carlo import solve_monte_carlo

from ..model_parser import ModelParser
from ..utils import read_in

def solve_identifiability(model):
    method = model['options']['method']
    if method == 'sensitivity':
        solve_sensitivity(model, ModelParser)
    elif method == 'monte_carlo':
        solve_monte_carlo(model)