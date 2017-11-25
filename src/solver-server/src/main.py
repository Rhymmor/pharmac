from aiohttp import web
from pkg.algorithms.utils import safe_get
from pkg.router.direct.router import handle_direct_problem

async def handle(request):
    name = request.match_info.get('name', "Anonymous")
    text = "Hello, " + name
    return web.Response(text=text)

app = web.Application()
app.router.add_get('/', handle)
app.router.add_get('/{name}', handle)

app.router.add_post('/api/direct-problem', handle_direct_problem)

web.run_app(app, port=5555)