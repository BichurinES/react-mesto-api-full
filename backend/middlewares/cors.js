const allowedCors = [
  'https://mestogram.nomoredomains.monster',
  'http://mestogram.nomoredomains.monster',
];

const DEFAULT_ALLOWED_METHODS = 'GET,PUT,PATCH,POST,DELETE';

module.exports.corsHandler = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);

    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);
    }
  }

  next();
};
