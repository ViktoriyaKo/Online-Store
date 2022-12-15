const tools = {
  delay(ms = 500) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res()
      }, ms)
    })
  }
}

export {tools}