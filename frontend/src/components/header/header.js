import { AppBar, InputBase, Link, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import styles from './header.styles'
import SearchIcon from '@material-ui/icons/Search'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => styles(theme))

const Header = () => {

  const classes = useStyles()

  const history = useHistory()

  const onKeyUp = (event) => {
    if (event.keyCode === 13 && event.target.value !== "") {
      console.log("asdasd")
      history.push(`/address/${event.target.value}/transactions`)
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          <Link href="/" variant="h6" className={classes.title}>
            Ethereum Explorer
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              placeholder="Search by address"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onKeyUp={onKeyUp}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )

}

export default Header
