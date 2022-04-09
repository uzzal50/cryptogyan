import React from 'react'
import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useCryptoContext } from '../CryptoContext'
import { darkTheme } from '../utils/index'
import LoginModal from './LoginModal'

const Header = () => {
  const useStyles = makeStyles({
    title: {
      color: 'gold',
      fontFamaily: 'Montserrat',
      flex: 1,
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    btn: {
      border: '1px solid gold',
      '&:hover': {
        background: 'gold',
        color: '#000',
      },
    },
  })

  const classes = useStyles()

  const { currency, symbol, setCurrency } = useCryptoContext()

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <div style={{ flex: 1 }}>
              <Link to='/'>
                <Typography className={classes.title} variat='h6'>
                  CryptoGyan
                </Typography>
              </Link>
            </div>

            <Select
              size='medium'
              variant='outlined'
              labelId='demo-select-small'
              id='demo-select-small'
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{
                marginRight: 15,
                width: 100,
                height: 35,
              }}
              className={classes.btn}
            >
              <MenuItem value='USD'>USD</MenuItem>
              <MenuItem value='INR'>NPR</MenuItem>
            </Select>

            <LoginModal />
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header
