import re
from numeric_parser import NumericStringParser

class ModelParser(object):

    def __init__(self, model):
        self.model = model

    def replace(self, formula, func_val, param_dict):
        for i in range(len(func_val)):
            formula = formula.replace('x_{{{}}}'.format(i + 1), str(func_val[i]))
        for key in param_dict:
            formula = re.sub(r"\b%s\b" % key, str(param_dict[key]), formula)
        return formula

    def parse(self, func_val, param_dict):
        if len(func_val) != len(self.model):
            return
        return [self.replace(x, func_val, param_dict) for x in list(self.model)]

    def eval(self, func_val, param_dict):
        parser = NumericStringParser()
        return [parser.eval(x) for x in self.parse(func_val, param_dict)]
