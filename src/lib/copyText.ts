const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return;
  } catch (e) {
    console.log('copyTextError', e);
  }
};

export default copyText;
