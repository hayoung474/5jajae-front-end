export const testApi = () => {
  return new Promise<{ value: string }>((resolve) => {
    setTimeout(() => {
      resolve({ value: 'hello world!' });
    }, 3000);
  });
};
