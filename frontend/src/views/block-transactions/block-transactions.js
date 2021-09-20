import { Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getBlockInformation } from "../../services/ethereum-explorer-api"

const BlockTransactionsView = () => {

  const { blockNumber } = useParams()

  const [ blockInfo, setBlockInfo ] = useState(null)

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
      <Typography variant="h4" gutterBottom>Transactions by block</Typography>

      {blockInfo?.transactions &&
        <TableContainer component={Paper}>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Transactions for block {blockNumber}</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {blockInfo.transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Link href={`/transactions/${transaction}`}>
                      {transaction}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>

        </TableContainer>
      }
    </>
  )

}

export default BlockTransactionsView
