import { Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getBlockInformation } from "../../services/ethereum-explorer-api"

const BlockView = () => {

  const { blockNumber } = useParams()

  const [ blockInfo, setBlockInfo ] = useState(null)

  console.log(blockInfo)

  useEffect(() => {
    if (!blockNumber) {
      return
    }

    getBlockInformation(blockNumber).then((response) => {
      setBlockInfo(response.data)
    })
  }, [blockNumber, setBlockInfo])

  return (
    <>
      <Typography variant="h4" gutterBottom>Block Information</Typography>

      {blockInfo &&
        <TableContainer component={Paper}>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Block {blockNumber}</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell><b>Hash</b>: {blockInfo.hash}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Miner</b>: {blockInfo.miner}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Timestamp</b>: {blockInfo.timestamp}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Difficulty</b>: {blockInfo.difficulty}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Total difficulty</b>: {blockInfo.totalDifficulty}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Gas limit</b>: {blockInfo.gasLimit}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Gas used</b>: {blockInfo.gasUsed}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">
                  <Link href={`/blocks/${blockNumber}/transactions`}>Show transactions</Link>
                </TableCell>
              </TableRow>
            </TableBody>

          </Table>

        </TableContainer>
      }

    </>
  )

}

export default BlockView
