from pydantic import BaseModel, Extra


class Transaction(BaseModel):

    blockHash: str
    blockNumber: str
    hash: str
    from_: str
    to: str
    gas: str
    gasPrice: str

    class Config:
        extra = Extra.ignore
        fields = {
            'from_': 'from'
        }
