const tools = {
  delay(ms = 500) {
    return new Promise<void>((res, rej) => {
      setTimeout(() => {
        res();
      }, ms);
    });
  },
};

export { tools };
//do nothing
