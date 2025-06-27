const jwt = require('jsonwebtoken');
const FileHandler = require('../utils/fileHandler');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Acceso denegado. Token requerido.' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await FileHandler.findUserById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token inválido.' 
      });
    }

    req.user = { 
      id: user.id, 
      email: user.email, 
      name: user.name 
    };
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Token inválido.' 
    });
  }
};

module.exports = authMiddleware;
