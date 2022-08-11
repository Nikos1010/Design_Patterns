const ClientBuilder = require('../models/Builder/Builder.js');
const ProxyClient = require('../Structural/Proxy/proxy.js');


exports.getClients = (req, res) => {
    const clientOne = new ClientBuilder()
        .withIdentity('12345')
        .withAddress('Street 34th')
        .withCellphoneNumber('2689564')
        .withTypePerson('Natural')
        .withNameClient('Uver')
        .build();
    
    const proxyOne = new Proxy(clientOne, ProxyClient);
    proxyOne.nameClient;
    proxyOne.identity = '5894';
    proxyOne.identity;

    const clientTwo = new ClientBuilder()
        .withNameClient('Andrea')
        .withIdentity('95687')
        .withTypePerson('Juridica')
        .build();

    const proxyTwo = new Proxy(clientTwo, ProxyClient);
    proxyTwo.nameClient = 'Andres';
    proxyTwo.typePerson = 'Asdadfsad';
    proxyTwo.identity = "1256";
    proxyTwo.identity;

    const allClients = [clientOne, clientTwo];
    res.json(allClients);
}