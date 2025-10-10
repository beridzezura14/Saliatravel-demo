const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // ქაფი Authorization ჰედერისთვის
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  // Bearer გამოთვლა
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  // ვალიდაცია
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'invalid token' });

    // decoded-ის შენახვა request-ში
    req.user = decoded;
    next();
  });
};
