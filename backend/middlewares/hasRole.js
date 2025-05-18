const hasRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.send({ error: "Access denied" });
      return;
    }

    next();
  };
};

module.exports = { hasRole };
