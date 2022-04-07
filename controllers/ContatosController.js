const{sequelize} = require('../database/models');

const controller = {
    index: async (req, res) => {
        let uid = req.usuario.id;
        let sql = `SELECT id, nome FROM contatos WHERE usuarios_id=${uid}`;
        let contatos = await sequelize.query(sql, {type:sequelize.QueryTypes.SELECT});

        // Adicionando campos de telefones e emails
        contatos = contatos.map(
            c => {
                c.emails = [];
                c.telefones = [];
                return c;
            }
        )

        // Carregando os telefones dos contatos do usuário de id "uid";
        sql = `
            select
                t.id,
                t.telefone,
                t.contatos_id
            from
                contatos c
                inner join telefones t on t.contatos_id=c.id
            where
                usuarios_id=${uid};
        `
        let telefones = await sequelize.query(sql, {type:sequelize.QueryTypes.SELECT});
        

        // Carregando os emails dos contatos do usuário de id "uid"
        sql = `
            select
                e.id,
                e.email,
                e.contatos_id
            from
                contatos c
                inner join emails e on e.contatos_id=c.id
            where
                usuarios_id=${uid};
        `
        let emails = await sequelize.query(sql, {type:sequelize.QueryTypes.SELECT});
        
        
        // Inserindo os emails carregados nos seus respectivos contatos
        emails.forEach(
            
            email => {

                // Encontrar o contato que é dono deste email
                let contato = contatos.find(c => c.id == email.contatos_id);

                // Adicionar ao array de emails desse contato o email da vez!
                contato.emails.push(email.email);

            }
        
        );

        // Inserindo os telefones carregados nos seus respectivos contatos
        telefones.forEach(
            
            telefone => {

                // Encontrar o contato que é dono deste telefone
                let contato = contatos.find(c => c.id == telefone.contatos_id);

                // Adicionar ao array de telefones desse contato o telefone da vez!
                contato.telefones.push(telefone.telefone);

            }
        
        );

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
    create: async (req, res) => {
        let {nome, emails, telefones} = req.body;

        let sql = `INSERT INTO contatos (nome, usuarios_id) VALUES ("${nome}", "${uid}")`;
        let resultado = await sequelize.query(sql, {type: sequelize.QueryTypes.INSERT});
        let idCriado = resultado[0];
        
        sequelize.queryInterface.bulkInsert('emails', emails.map(e => {return {email: e, contatos_id: idCriado}}));

        sequelize.queryInterface.bulkInsert('telefones', telefones.map(t => {return {telefone: t, contatos_id: idCriado}}));


        res.json({msg: "OK", idCriado});
    },
    destroy: (req, res) => {
        res.send('destroy');
    },
    update: (req, res) => {
        res.send('update');
    }
};

module.exports = controller;