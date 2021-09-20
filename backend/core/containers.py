from dependency_injector import containers, providers

from backend.core import config
from backend.services.etherscan_service import EtherscanService


class Container(containers.DeclarativeContainer):

    etherscan_service = providers.Singleton(
        EtherscanService,
        api_key=config.ETHERSCAN_API_KEY
    )
