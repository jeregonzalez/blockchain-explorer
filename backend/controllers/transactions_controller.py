from dependency_injector.wiring import inject, Provide
from fastapi import APIRouter, Depends
from starlette import status

from backend.core.containers import Container
from backend.services.etherscan_service import EtherscanService

router = APIRouter()


@router.get(
    '/{transaction_hash}',
    name='get transaction info',
    status_code=status.HTTP_200_OK
)
@inject
async def get_transaction_info(
        transaction_hash: str,
        etherscan_service: EtherscanService = Depends(Provide[Container.etherscan_service])
):
    return etherscan_service.get_transaction_info(transaction_hash)


@router.get(
    '/address/{address}',
    name='get transactions history by address',
    status_code=status.HTTP_200_OK
)
@inject
async def get_transactions_history_by_address(
        address: str,
        etherscan_service: EtherscanService = Depends(Provide[Container.etherscan_service])
):
    return etherscan_service.get_transaction_history_by_address(address)
