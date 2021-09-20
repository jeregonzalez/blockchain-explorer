import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getTransactionInfo } from "../../services/ethereum-explorer-api"

const TransactionView = () => {

  const { transactionHash } = useParams()

  const [ transactionInfo, setTransactionInfo ] = useState(null)

  useEffect(() => {
    getTransactionInfo(transactionHash).then((response) => {
      setTransactionInfo(response.data)
    })
  }, [transactionHash])

  return (
    <>
      <Typography variant="h4" gutterBottom>Transaction Information</Typography>

      {transactionInfo &&
        <TableContainer component={Paper}>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Transaction {transactionHash}</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell><b>Block number</b>: {transactionInfo.blockNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Hash</b>: {transactionInfo.hash}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>From</b>: {transactionInfo.from}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>To</b>: {transactionInfo.to}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Gas</b>: {transactionInfo.gas}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><b>Gas price</b>: {transactionInfo.gasPrice}</TableCell>
              </TableRow>
            </TableBody>

          </Table>

        </TableContainer>
      }

    </>
  )

}

export default TransactionView
