from ..algorithms.inverse_problem.inverse_problem import solve_inverse
from .utils import handle_post

async def handle_inverse_problem(request):
    return await handle_post(request, lambda body: solve_inverse(body))