import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ data: 'Unauthorized' });
    const isCustomAuth = token.length < 500;
    if (isCustomAuth) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedToken.id;
    } else {
      const decodedToken = jwt.decode(token);
      req.userId = decodedToken.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
