from typing import List, Union

import httpx


class EtherscanService:

    URL = 'https://api.etherscan.io/api'

    def __init__(self, api_key: str):
        self.__api_key = api_key
        self.httpx_client = httpx.AsyncClient(
            base_url=self.URL,
            params={'apikey': self.__api_key}
        )

    async def get_last_block_number(self, return_hex: bool = True) -> Union[str, int]:
        r = await self.httpx_client.get(
            url='',
            params={
                'module': 'proxy',
                'action': 'eth_blockNumber'
            }
        )
        r.raise_for_status()
        block_number = r.json()['result']
        return block_number if return_hex else int(block_number, 16)

    async def get_block(self, block_number: int) -> dict:
        r = await self.httpx_client.get(
            url='',
            params={
                'module': 'block',
                'action': 'getblockreward',
                'blockno': block_number
            }
        )
        r.raise_for_status()
        return r.json()['result']

    async def get_blocks(self, limit: int = 10, offset: int = 0) -> List[dict]:
        last_block_number = await self.get_last_block_number(return_hex=False)
        first = last_block_number - offset - limit
        last = first + limit
        # result = await asyncio.gather(
        #     *[self.get_block_info(i) for i in range(first, last)]
        # )
        result = [await self.get_block(i) for i in range(first, last)]
        return result

    async def get_block_info(self, block_tag: str) -> dict:
        r = await self.httpx_client.get(
            url='',
            params={
                'module': 'proxy',
                'action': 'eth_getBlockByNumber',
                'tag': block_tag,
                'boolean': False
            }
        )
        r.raise_for_status()
        return r.json()['result']

    async def get_transaction_info(self, transaction_hash: str) -> dict:
        r = await self.httpx_client.get(
            url='',
            params={
                'module': 'proxy',
                'action': 'eth_getTransactionByHash',
                'txhash': transaction_hash,
            }
        )
        r.raise_for_status()
        return r.json()['result']

    async def get_transaction_history_by_address(
            self,
            address: str,
            page: int = 1,
            offset: int = 10,
            sort: str = 'asc'
    ) -> dict:
        r = await self.httpx_client.get(
            url='',
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
        r.raise_for_status()
        return r.json()['result']
