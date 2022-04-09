import React, { useEffect, useState } from 'react'
import {
  CircularProgress,
  makeStyles,
  ThemeProvider,
  Typography,
} from '@material-ui/core'
import { darkTheme } from '../utils'
import { HistoricalChart } from '../apis/api'
import axios from 'axios'
import { useCryptoContext } from '../CryptoContext'
import { Line } from 'react-chartjs-2'

const CoinCharts = ({ coin }) => {
  const useStyles = makeStyles((theme) => ({
    container: {
      width: '75%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down('md')]: {
        width: '100%',
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }))

  const classes = useStyles()
  const { currency } = useCryptoContext()
  const [historic, setHistoric] = useState()
  const [days, setDays] = useState(1)
  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
    setHistoric(data.prices)
  }

  useEffect(() => {
    fetchHistoricData()
  }, [currency, days])

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historic ? (
          <CircularProgress
            style={{ color: 'gold' }}
            size={250}
            thickness={1}
          />
        ) : (
          <Typography variant='h5'>Charts coming soon.</Typography>
        )}
      </div>
    </ThemeProvider>
  )
}

export default React.memo(CoinCharts)
