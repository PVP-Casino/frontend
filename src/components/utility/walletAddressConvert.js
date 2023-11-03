const walletAddressConvert = (str, length = 5) => {
  return str.slice(0, length) + '...' + str.slice(str.length - length, str.length);
};

export default walletAddressConvert;
