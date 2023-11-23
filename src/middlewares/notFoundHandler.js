export default (req, res, next) => {
  return res.status(404).json({
    message: `${req.method} ${req.url}`,
    response: null,
  });
};
