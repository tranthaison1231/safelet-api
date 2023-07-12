export const errorFilter = (err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  return res.status(err.status || 500).json({
    status: status,
    message: message,
  });
};
