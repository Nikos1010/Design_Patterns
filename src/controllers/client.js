const ClientBuilder = require('../models/Builder/Builder.js');
const Client = require('../models/Prototype/Client.js');

exports.postAddClient = (req, res) => {
    // const { name, typePerson, identity } = req.body;
    // const infoClient = { name, typePerson, identity };
}

exports.getClients = (req, res) => {
    const clientOne = new ClientBuilder()
        .withIdentity('12345')
        .withAddress('Street 34th')
        .withCellphoneNumber('2689564')
        .withTypePerson('Natural')
        .withNameClient('Uver')
        .build();
    
    console.log(clientOne);

    const clientTwo = new ClientBuilder()
        .withNameClient('Andrea')
        .withIdentity('95687')
        .withTypePerson('Juridica')
        .build();

    console.log(clientTwo);

    const allClients = [clientOne, clientTwo];
    res.json(allClients);
}