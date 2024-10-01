function error(message, code) {
  let e = new Error(message);

  if (code) {
    e.stausCode = code;
  }

  return e;
}

module.exports = error;