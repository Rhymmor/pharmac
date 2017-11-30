from ..algorithms.identifiability.methods import solve_identifiability
from .utils import handle_post

async def handle_identifiability_problem(request):
    return await handle_post(request, lambda body: solve_identifiability(body))