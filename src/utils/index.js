const encode = (decodedString) => {
  try {
    const buff = Buffer.from(decodedString, 'utf-8');
    const base64EncodedString = buff.toString('base64');
    return base64EncodedString;
  } catch (e) {
    return '';
  }
};

const decode = (base64EncodedString) => {
  try {
    const buff = Buffer.from(base64EncodedString, 'base64');
    const decodedString = buff.toString('utf-8');
    return decodedString;
  } catch (e) {
    return '';
  }
};

module.exports = {
  encode,
  decode
};
