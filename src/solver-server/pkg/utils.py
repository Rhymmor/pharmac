from os import environ

def get_env(name):
    if name not in environ:
        return ''
    return environ[name]

def safe_parse_int(text, default=None):
    try:
        return int(text)
    except ValueError:
        return default