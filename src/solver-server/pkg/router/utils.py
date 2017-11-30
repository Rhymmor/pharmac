import json
from ..algorithms.utils import NumpyEncoder
from aiohttp.web import json_response
from json.decoder import JSONDecodeError

def numpy_dump(dict):
    return json.dumps(dict, cls=NumpyEncoder)

async def handle_post(request, handle):
    try:
        body = await request.json()
        return json_response(handle(body), dumps=numpy_dump)
    except JSONDecodeError:
        return json_response({'message': 'No body in request'}, status=400)
    else:
        return json_response({'message': 'Error while handling request'}, status=400)