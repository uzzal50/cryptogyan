import React, { useEffect, useState } from 'react'
import { useCryptoContext } from '../CryptoContext'
import { CoinList } from '../apis/api'
import axios from 'axios'
import {
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  makeStyles,
  Typography,
  TextField,
  ThemeProvider,
} from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { Pagination } from '@mui/material'
import { darkTheme, numberWithCommas } from '../utils'

const CoinsTable = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const { currency, symbol } = useCryptoContext()
  const navigate = useNavigate()

  const useStyles = makeStyles({
    row: {
      backgroundColor: '#16171a',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#131111',
      },
      fontFamily: 'Montserrat',
    },
    pagination: {
      '& .MuiPaginationItem-root': {
        color: '#fff',
      },
      '& .Mui-selected': {
        color: 'gold',
        border: '1px solid',
      },
    },
  })
  const classes = useStyles()

  const fetchCoins = async () => {
    setLoading(true)
    const { data } = await axios.get(CoinList(currency))
    setCoins(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchCoins()
  }, [currency])

  const handleSearch = () => {
    return coins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
      )
    })
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: 'center' }}>
        <Typography
          variant='h5'
          style={{ marginTop: 28, marginBottom: 18, fontFamily: 'Montserrat' }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label='Search For a Crypto Currency..'
          variant='outlined'
          style={{ marginBottom: 20, width: '100%' }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: 'gold' }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: '#EEBC1D' }}>
                <TableRow>
                  {['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (
                    <TableCell
                      style={{
                        color: 'black',
                        fontWeight: '700',
                        fontFamily: 'Montserrat',
                      }}
                      key={head}
                      // align={head === 'Coin' ? '' : 'right'}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0
                    return (
                      <TableRow
                        onClick={() => navigate(`coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component='th'
                          scope='row'
                          style={{
                            display: 'flex',
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height='50'
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                          >
                            <span
                              style={{
                                textTransform: 'uppercase',
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: 'darkgrey' }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {symbol}
                          {symbol === 'Rs'
                            ? numberWithCommas(
                                (row.current_price * 1.61).toFixed(2)
                              )
                            : numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          style={{
                            color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
                            fontWeight: 500,
                          }}
                        >
                          {profit && '+'}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell>
                          {symbol}{' '}
                          {symbol === 'Rs'
                            ? numberWithCommas(
                                (row.market_cap * 1.61).toString().slice(0, -6)
                              )
                            : numberWithCommas(
                                row.market_cap.toString().slice(0, -6)
                              )}
                          M
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          count={Number((handleSearch().length / 10).toFixed(0))}
          style={{
            padding: 20,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          variant='outlined'
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value)
            window.scroll(0, 450)
          }}
        />
      </Container>
    </ThemeProvider>
  )
}

export default CoinsTable
