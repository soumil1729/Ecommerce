const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'You are not authenticated hye' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: payload.userId,
      username: payload.username,
      isAdmin: payload.isAdmin,
    };
    next();
  } catch (error) {
    res.status(401).json({ msg: 'You are not authenticated' });
  }
};

const verifyTokenAuthorization = (req, res, next) => {
  if (req.user.userId === req.params.id || req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({
      msg: 'You are not allowed to do that,USER id must be incorrect or have not admin access',
    });
  }
};

const verifyTokenAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res
      .status(403)
      .json({ msg: 'You are not allowed to do that,Required admin access' });
  }
};
module.exports = { auth, verifyTokenAuthorization, verifyTokenAdmin };
