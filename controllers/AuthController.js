const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {sequelize} = require('../database/models');

const AuthController = {
    login: async (req, res) => {
        // Capturar o email e a senha
        let {email, senha} = req.body;

        // Levantar do BD o usuário com o email dado
        let sql = `SELECT id, senha, nome FROM usuarios WHERE email = '${email}'`;
        let resultados = await sequelize.query(sql, {type:sequelize.QueryTypes.SELECT});

        // Caso não haja usuário, retornar erro 403
        if(resultados.length == 0){
            return res.status(403).json({msg: "Falha no login"});
        };

        //Testar a senha do usuario, retornar 403 caso não OK
        if(!bcrypt.compareSync(senha, resultados[0].senha)){
            return res.status(403).json({msg:"Falha no login"});
        };

        //Criar o token
        let usuario = {
            id: resultados[0].id,
            nome:resultados[0].nome,
            email: email
        };

        let token = jwt.sign(usuario, "SEGREDO");

        //Retornar msg de sucesso de login e o token
        return res.status(200).json({token, usuario});
    }
};

module.exports = AuthController;