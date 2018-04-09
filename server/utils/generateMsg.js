const generateMsg = (from, text) => {
  const obj = {
    from,
    text,
    createdAt: new Date().getTime()
  };

  return obj;
};

const generateLocationMsg = (from, lat, lng) => {
  const obj = {
    from,
    url: `https://google.com/maps?q=${lat},${lng}`,
    createdAt: new Date().getTime()
  };

  return obj;
};

module.exports = {
  generateMsg,
  generateLocationMsg
};
