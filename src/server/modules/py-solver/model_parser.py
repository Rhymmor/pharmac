import re
from py_expression_eval import Parser

class ModelParser(object):

    def __init__(self, model):
        self.parser = Parser()
        self.model = self.parse_model(model)

    def parse_model(self, model):
        return [self.parser.parse(x) for x in list(model)]

    def replace(self, formula, func_val, param_dict):
        for i in range(len(func_val)):
            param_dict['x_%d' % (i + 1)] = func_val[i]
        for i in range(len(func_val)):
            formula = formula.replace('x_{{{}}}'.format(i + 1), str(func_val[i]))
        for key in param_dict:
            formula = re.sub(r"\b%s\b" % key, str(param_dict[key]), formula)
        return formula

    def get_variables(self, func_val, param_dict):
        variables = dict(param_dict)
        for i in range(len(func_val)):
            variables['x_%d' % (i + 1)] = func_val[i]
        return variables

    def parse(self, func_val, param_dict):
        if len(func_val) != len(self.model):
            return
        return [self.replace(x, func_val, param_dict) for x in list(self.model)]

    def eval(self, func_val, param_dict):
        variables = self.get_variables(func_val, param_dict)
        return [x.evaluate(variables) for x in self.model]