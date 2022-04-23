const { verify } = require('jsonwebtoken')

const authenticate = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Unauthorised');
    // decode the token
    const decoded = verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    if (!decoded) return res.status(401).send('Unauthorised');
    const {id, name} = decoded;
    console.log(id, typeof id);
    req.auth = {id, name};
    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).send('Unauthorised');
  }
}

module.exports = { authenticate }
