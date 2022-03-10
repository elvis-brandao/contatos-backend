const{sequelize} = require('../database/models');
const uid = 1;

const controller = {
    index: async (req, res) => {
        let sql = `SELECT id, nome FROM contatos WHERE usuarios_id = ${uid}`;
        let contatos = await sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});
        res.status(200).json(contatos);
    },
    search: async (req, res) => {
        let sql = `SELECT id, nome FROM contatos WHERE usuarios_id=${uid} AND nome LIKE '%${req.query.q}%'`;
        let contato = await sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});
        res.status(200).json(contato);
    },
    show: async (req, res) => {
        let sql = `SELECT id, nome FROM contatos WHERE usuarios_id = ${uid} AND id = ${req.params.id}`;
        let contato = await sequelize.query(sql, {type: sequelize.QueryTypes.SELECT});
        if(contato.length > 0){
            res.status(200).json(contato[0]);
        }else{
            res.status(404).json({msg: 'Usuário não existente'});
        };
    },
    create: (req, res) => {
        res.send('create');
    },
    destroy: (req, res) => {
        res.send('destroy');
    },
    update: (req, res) => {
        res.send('update');
    }
};

module.exports = controller;