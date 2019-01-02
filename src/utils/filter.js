const filter = filter => (req, res, next) => {
    req.filter = filter;
    next();
}

module.exports = filter;