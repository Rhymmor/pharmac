
from py_expression_eval import Parser

class ModelParser(object):

    def __init__(self, model):
        self.parser = Parser()
        self.model = self.parse_model(model)

    def parse_model(self, model):
        return [self.parser.parse(x) for x in list(model)]

    def get_variables(self, func_val, param_dict):
        variables = dict(param_dict)
        for i, val in enumerate(func_val):
            variables['x_%d' % (i + 1)] = func_val[i]
        return variables

    def eval(self, func_val, param_dict):
        variables = self.get_variables(func_val, param_dict)
        return [x.evaluate(variables) for x in self.model]