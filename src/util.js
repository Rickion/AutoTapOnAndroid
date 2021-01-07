const parseInt16 = (val) => {
  if (val === 'ffffffff') {
    return -1;
  }
  return parseInt(val, 16);
};

module.exports = {
  parseInt16,
};
