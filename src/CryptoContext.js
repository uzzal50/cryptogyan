import React, { useContext, useEffect, useState } from 'react'

const CryptoContext = React.createContext()

const CryptoContextProvider = ({ children }) => {
  const [currency, setCurrency] = useState('INR')
  const [symbol, setSymbol] = useState('Rs')

  useEffect(() => {
    if (currency === 'INR') {
      setCurrency('INR')
    } else {
      setCurrency('USD')
      setSymbol('$')
    }
  }, [currency])
  return (
    <CryptoContext.Provider
      value={{
        currency,
        symbol,
        setCurrency,
      }}
    >
      {children}
    </CryptoContext.Provider>
  )
}

export default CryptoContextProvider

export const useCryptoContext = () => {
  return useContext(CryptoContext)
}
