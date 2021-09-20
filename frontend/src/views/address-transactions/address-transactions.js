import { Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getTransactionsHistoryByAddress } from "../../services/ethereum-explorer-api"

const AddressTransactionsView = () => {

  const { address } = useParams()

  const [ transactionsInfo, setTransactionsInfo ] = useState([])

  useEffect(() => {
    if (!address) {
      return
    }

    getTransactionsHistoryByAddress(address, 1, 10).then((response) => {
      setTransactionsInfo(response.data)
    })
  }, [address])

  return (
    <>
      <Typography variant="h4" gutterBottom>Transactions for address {address}</Typography>

      {transactionsInfo &&
        <TableContainer component={Paper}>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Block</TableCell>
                <TableCell>Hash</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Gas</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {transactionsInfo.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Link href={`/blocks/${transaction.blockNumber}`}>
                      {transaction.blockNumber}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/transactions/${transaction.hash}`}>
                      {transaction.hash}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/address/${transaction.from}/transactions`}>
                      {transaction.from}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/address/${transaction.to}/transactions`}>
                      {transaction.to}
                    </Link>
                  </TableCell>
                  <TableCell>
                      {transaction.gas}
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

export default AddressTransactionsView
