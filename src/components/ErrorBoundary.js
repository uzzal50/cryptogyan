function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role='alert'>
      <p>Soemthing went wrong</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>try again</button>
    </div>
  )
}

export default ErrorFallback
