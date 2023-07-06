module.exports = function (req, _res, next) {
  const data = {
    method: req.method,
    baseURL: req.baseURL,
    body: req.body,
    hostname: req.hostname,
    ip: req.ip,
    params: req.params,
    protocol: req.protocol,
  };
  console.log(JSON.stringify(data));
  next();
};
