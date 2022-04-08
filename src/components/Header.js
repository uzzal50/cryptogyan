import React from 'react'
import {
  AppBar,
  Container,
  createTheme,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useCryptoContext } from '../CryptoContext'

const Header = () => {
  const useStyles = makeStyles({
    title: {
      color: 'gold',
      fontFamaily: 'Montserrat',
      flex: 1,
      fontWeight: 'bold',
      cursor: 'pointer',
    },
  })

  const darkTheme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#fff',
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
              variant='outlined'
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{
                marginRight: 15,
                width: 100,
                height: 40,
              }}
            >
              <MenuItem value='USD'>USD</MenuItem>
              <MenuItem value='INR'>NPR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header
