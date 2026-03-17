const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(`Route introuvable - ${req.originalUrl}`);
  next(error);
};

module.exports = notFound;
