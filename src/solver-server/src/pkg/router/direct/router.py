from ...algorithms.direct_solver import direct_solver
from ..utils import handle_post

async def handle_direct_problem(request):
    return await handle_post(request, lambda body: direct_solver(body))