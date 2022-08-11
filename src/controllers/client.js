const Client = require('../models/Prototype/Client.js');

exports.postAddClient = (req, res) => {
    // const { name, typePerson, identity } = req.body;
    // const infoClient = { name, typePerson, identity };
}

exports.getClient = (req, res) => {
    const clientOne = new Client({ name: 'Leosh', identity: '156789' });
}