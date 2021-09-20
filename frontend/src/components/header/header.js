import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import styles from './header.styles'

const useStyles = makeStyles((theme) => styles(theme))

const Header = () => {

  const classes = useStyles()

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Ethereum Explorer
        </Typography>
      </Toolbar>
    </AppBar>
  )

}

export default Header
