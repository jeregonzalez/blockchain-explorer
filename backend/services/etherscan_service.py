import time
from typing import List, Union

import httpx
from fastapi import HTTPException
from starlette import status


class EtherscanService:

    URL = 'https://api.etherscan.io/api'

    def __init__(self, api_key: str):
        self.__api_key = api_key
        self.httpx_client = httpx.AsyncClient(
            base_url=self.URL,
            params={'apikey': self.__api_key}
        )

    async def __get(self, params: dict):
        try:
            r = await self.httpx_client.get(url='', params=params)
            r.raise_for_status()
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail='Error retrieving data from Etherscan'
            ) from e
        return r.json()['result']

    async def get_last_block_number(self, return_hex: bool = True) -> Union[str, int]:
        block_number = await self.__get(
            params={
                'module': 'proxy',
                'action': 'eth_blockNumber'
            }
        )
        return block_number if return_hex else int(block_number, 16)

    async def get_block(self, block_number: int) -> dict:
        return await self.__get(
            params={
                'module': 'block',
                'action': 'getblockreward',
                'blockno': block_number
            }
        )

    async def get_blocks(self, page: int = 1, offset: int = 10) -> List[dict]:
        last_block_number = await self.get_last_block_number(return_hex=False)
        first = last_block_number - (page * offset)
        last = first + offset
        # Doesn't work cause the api limits
        # result = await asyncio.gather(
        #     *[self.get_block_info(i) for i in range(first, last)]
        # )
        # result = [await self.get_block(i) for i in range(first, last)]

        # Workaround to avoid limit of api calls per second
        result = []
        for i in range(last, first, -1):
            time.sleep(0.25)
            result.append(await self.get_block(i))
        return result

    async def get_block_info(self, block_tag: str) -> dict:
        return await self.__get(
            params={
                'module': 'proxy',
                'action': 'eth_getBlockByNumber',
                'tag': block_tag,
                'boolean': False
            }
        )

    async def get_transaction_info(self, transaction_hash: str) -> dict:
        return await self.__get(
            params={
                'module': 'proxy',
                'action': 'eth_getTransactionByHash',
                'txhash': transaction_hash,
            }
        )

    async def get_transaction_history_by_address(
            self,
            address: str,
            page: int = 1,
            offset: int = 10,
            sort: str = 'asc'
    ) -> dict:
        return await self.__get(
            params={
                'module': 'account',
                'action': 'txlist',
                'address': address,
                'startblock': 0,
                'endblock': 99999999,
                'page': page,
                'offset': offset,
                'sort': sort
            }
        )
