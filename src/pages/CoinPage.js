import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCryptoContext } from '../CryptoContext'
import { SingleCoin } from '../apis/api'
import { LinearProgress, makeStyles, Typography } from '@material-ui/core'
import parse from 'html-react-parser'
import { numberWithCommas } from '../utils/index'

const CoinPage = () => {
  const { id } = useParams()
  const [coin, setCoin] = useState()
  const { symbol, currency } = useCryptoContext()

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id))
    setCoin(data)
  }

  useEffect(() => {
    fetchCoin()
  }, [])

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    sidebar: {
      width: '30%',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 25,
      borderRight: '2px solid grey',
    },
    heading: {
      fontWeight: 'bold',
      marginBottom: 20,
      fontFamily: 'Montserrat',
    },
    description: {
      width: '100%',
      fontFamily: 'Montserrat',
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: 'justify',
    },
    marketData: {
      alignSelf: 'start',
      padding: 25,
      paddingTop: 10,
      width: '100%',
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        justifyContent: 'space-around',
      },
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
      [theme.breakpoints.down('xs')]: {
        alignItems: 'start',
      },
    },
  }))

  const classes = useStyles()

  if (!coin) return <LinearProgress style={{ backgroundColor: 'gold' }} />
  console.log(coin)

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin.image.large}
          alt={coin.name}
          height='200'
          style={{ marginBottom: 20 }}
        />
        <Typography variant='h3' className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant='subtitle1' className={classes.description}>
          {parse(`${coin.description.en}`)}
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: 'flex' }}>
            <Typography variant='h5' className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant='h5'
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: 'flex' }}>
            <Typography variant='h5' className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant='h5'
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {symbol}{' '}
              {symbol === 'Rs'
                ? numberWithCommas(
                    (
                      coin.market_data.current_price[currency.toLowerCase()] *
                      1.61
                    ).toFixed(2)
                  )
                : numberWithCommas(
                    coin.market_data.current_price[
                      currency.toLowerCase()
                    ].toFixed(2)
                  )}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant='h5' className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant='h5'
              style={{
                fontFamily: 'Montserrat',
              }}
            >
              {symbol}{' '}
              {symbol === 'Rs'
                ? numberWithCommas(
                    (
                      coin?.market_data.market_cap[currency.toLowerCase()] *
                      1.61
                    )
                      .toString()
                      .slice(0, -6)
                  )
                : numberWithCommas(
                    coin?.market_data.market_cap[currency.toLowerCase()]
                      .toString()
                      .slice(0, -6)
                  )}
              M
            </Typography>
          </span>
        </div>
      </div>
    </div>
  )
}

export default CoinPage
