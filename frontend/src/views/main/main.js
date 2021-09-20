import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import { getLastBlocks } from "../../services/ethereum-explorer-api"

const MainView = () => {

  const [blocks, setBlocks] = useState([])

  useEffect(() => {
    getLastBlocks().then((response) => {
      setBlocks(response.data)
    })
  }, [])

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>Latest blocks</Typography>

      <TableContainer component={Paper}>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Block Number</TableCell>
              <TableCell align="center">Timestamp</TableCell>
              <TableCell align="center">Miner</TableCell>
              <TableCell align="center">Reward</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {blocks.map((block, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" align="center">{block.blockNumber}</TableCell>
                <TableCell align="center">{block.timeStamp}</TableCell>
                <TableCell align="center">{block.blockMiner}</TableCell>
                <TableCell align="center">{block.blockReward}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>

      </TableContainer>

    </Container>
  )

}

export default MainView
