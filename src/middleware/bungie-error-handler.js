export function checkError(bungieResponse) {
  const { ErrorCode } = bungieResponse
  if (ErrorCode === 99 || ErrorCode === 10 || ErrorCode === 12) {
    const unauthorized = new Error('Unauthorized')
    unauthorized.status = 401
    throw unauthorized
  }

  if (ErrorCode === 11 || ErrorCode === 21 || ErrorCode === 103 || ErrorCode === 116 || ErrorCode === 165 || ErrorCode === 611 || ErrorCode === 622 || ErrorCode === 686 || ErrorCode === 688 || ErrorCode === 1601 || ErrorCode === 1620) {
    const error = new Error('Not Found')
    error.status = 404
    throw error
  }

  if (ErrorCode === 9) {
    const error = new Error('Bad Request')
    error.status = 400
    throw error
  }

  if (ErrorCode > 1) {
    const error = new Error('Server Error')
    error.status = 500
    error.bungieError = bungieResponse.ErrorCode
    throw error
  }

  return bungieResponse
}
