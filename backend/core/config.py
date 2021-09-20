import os

from starlette.config import Config

ROOT_DIR = os.getcwd()

_config = Config(os.path.join(ROOT_DIR, '.env'))

APP_VERSION = '0.0.1'
APP_NAME = 'ripio-portal-api'
API_PREFIX = '/api/v1'

DEBUG: bool = _config('DEBUG', cast=bool, default=False)

ETHERSCAN_API_KEY: str = _config('ETHERSCAN_API_KEY', cast=str)
