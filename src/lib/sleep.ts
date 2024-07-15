function sleep(ms = 100): Promise<void> {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

export default sleep;
