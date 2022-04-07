const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    if(req.headers.authorization === undefined){
        res.status(400).json({msg: "Requisição sem campo autorization"});
    };

    let token = req.headers.authorization.replace('bearer ', '');

    let usuario;
    try {
        usuario = jwt.verify(token, 'SEGREDO');
    }catch (error){
        res.status(403).json({msg: error.msg});
    };

    req.usuario = usuario;
    
    next();
};