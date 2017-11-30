from aiohttp import web
from pkg.router.direct import handle_direct_problem
from pkg.router.inverse import handle_inverse_problem
from pkg.router.identifiability import handle_identifiability_problem
from pkg.utils import get_env, safe_parse_int

app = web.Application()

app.router.add_post('/api/direct-problem/solve', handle_direct_problem)
app.router.add_post('/api/inverse-problem/solve', handle_inverse_problem)
app.router.add_post('/api/identifiability-problem/solve', handle_identifiability_problem)

server_port = safe_parse_int(get_env('SOLVER_SERVER_PORT'), 5555)

web.run_app(app, port=server_port)