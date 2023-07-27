export const errorFilter = (err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  return res.status(err.status).json({
    status: status,
    message: message,
  });
};
