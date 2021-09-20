from dependency_injector.wiring import inject, Provide
from fastapi import APIRouter, Depends
from starlette import status

from backend.controllers.dependencies import pagination_params
from backend.core.containers import Container
from backend.services.etherscan_service import EtherscanService

router = APIRouter()


@router.get(
    '',
    name='get last blocks',
    status_code=status.HTTP_200_OK
)
@inject
async def get_last_blocks(
        pagination: dict = Depends(pagination_params),
        etherscan_service: EtherscanService = Depends(Provide[Container.etherscan_service])
):
    return await etherscan_service.get_blocks(**pagination)


@router.get(
    '/{block_number}',
    name='get block info by block_number',
    status_code=status.HTTP_200_OK
)
@inject
async def get_block(
        block_number: int,
        etherscan_service: EtherscanService = Depends(Provide[Container.etherscan_service])
):
    return await etherscan_service.get_block_info(hex(block_number))
