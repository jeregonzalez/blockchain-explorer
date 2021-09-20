from typing import List

from pydantic import BaseModel, Extra


class Block(BaseModel):

    blockNumber: str
    timeStamp: str
    blockMiner: str
    blockReward: str

    class Config:
        extra = Extra.ignore


class BlockInformation(BaseModel):

    miner: str
    timestamp: str
    hash: str
    difficulty: str
    totalDifficulty: str
    gasLimit: str
    gasUsed: str
    transactions: List[str]

    class Config:
        extra = Extra.ignore
