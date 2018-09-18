export default opts => {
  console.log(opts)

  if (opts.mutationSuccess) {
    opts.dispatch({
      type: opts.mutationSuccess,
      payload: false
    })
  }

  if (opts.mutationError) {
    opts.dispatch({
      type: opts.mutationError,
      payload: opts.err
    })
  }

  setTimeout(() => {
    if (opts.mutationError) {
      opts.dispatch({
        type: opts.mutationError,
        payload: null
      })
    }
  }, 2000)

  return Promise.reject(opts.err)
}
