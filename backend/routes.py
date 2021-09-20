from fastapi import APIRouter

from backend.controllers import blocks_controller, transactions_controller
from backend.core.config import API_PREFIX

api_router = APIRouter(prefix=API_PREFIX)

api_router.include_router(blocks_controller.router, prefix='/blocks', tags=['blocks'])
api_router.include_router(transactions_controller.router, prefix='/transactions', tags=['transactions'])
