import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import banner from '../../assets/banner.jpg'
import Carousel from './Carousel'

const Banner = () => {
  const useStyles = makeStyles({
    banner: {
      backgroundImage: `url(${banner})`,
      backgroundPosition: 'right',
    },
    bannerContent: {
      height: 400,
      display: 'flex',
      flexDirection: 'column',

      justifyContent: 'space-around',
    },
    title: {
      display: 'flex',
      height: '40%',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
    },
  })
  const classes = useStyles()
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.title}>
          <Typography
            variant='h2'
            style={{
              fontWeight: 'bold',
              marginBottom: '15',
              fontFamily: 'Montserrat',
            }}
          >
            CryptoGyan
          </Typography>
          <Typography
            variant='subtitle2'
            style={{
              color: 'darkgrey',
              textTransform: 'capitalize',
              fontFamily: 'Montserrat',
            }}
          >
            Know the Crypto
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  )
}

export default Banner
