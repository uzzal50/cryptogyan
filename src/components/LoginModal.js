import React, { useState } from 'react'
import {
  Modal,
  Typography,
  Box,
  Button,
  makeStyles,
  rgbToHex,
} from '@material-ui/core'

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  height: 420,
  overflow: 'hidden',
}

const LoginModal = () => {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  const useStyles = makeStyles({
    btn: {
      color: '#fff',
      border: '1px solid gold',
      '&:hover': {
        background: 'gold',
        color: '#000',
      },
    },
    topContainer: {
      width: '100%',
      height: '250px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '0 1.8em',
      paddingBottom: '5em',
    },
    backdrop: {
      position: 'absolute',
      width: '160%',
      height: '550px',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '50%',
      background: 'rgb(241, 196, 15)',
      background:
        'linear-gradient(58deg,rgba(241, 196, 15, 1) 20%,rgba(243, 172, 18, 1) 100%)',

      transform: 'rotate(60deg)',
      top: '-290px',
      left: '-70px',
    },
    HeaderContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    HeaderText: {
      fontSize: '30px',
      fontWeight: '600',
      lineHeight: '1.24',
      color: '#fff',
      zIndex: '1000000',
      margin: '0',
    },
  })

  const classes = useStyles()

  return (
    <>
      <Button variant='outlined' className={classes.btn} onClick={handleOpen}>
        Login
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className={classes.topContainer}>
            <div className={classes.backdrop}>
              <div className={classes.HeaderContainer}>
                <div>
                  <h2 className={classes.HeaderText}>Welcome Back</h2>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default LoginModal
