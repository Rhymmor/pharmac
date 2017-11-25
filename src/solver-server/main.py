from aiohttp import web
from pkg.algorithms.utils import safe_get
from pkg.router.direct import handle_direct_problem
from pkg.router.inverse import handle_inverse_problem
from pkg.router.identifiability import handle_identifiability_problem

app = web.Application()

app.router.add_post('/api/direct-problem/solve', handle_direct_problem)
app.router.add_post('/api/inverse-problem/solve', handle_inverse_problem)
app.router.add_post('/api/identifiability-problem/solve', handle_identifiability_problem)

web.run_app(app, port=5555)