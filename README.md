<center>
	<h1>Design Patterns</h1>
</center>

Los patrones de diseño son una manera ya probada de resolver los problemas comunes, que podemos encontrar en el desarrollo de software. Cuando necesitemos resolver un problema en el desarrollo, revisando y analizando este, encontraremos que podemos aplicar un patron para ese problema en especifico, por cada problema que tengamos, solo podemos aplicar un patron. Si el patron no funciona de la mejor manera, significa que no es el patron indicado para la solución de ese problema.

Encontramos tres familias de patrones:

- [Patrones Creacionales](https://github.com/Nikos1010/Design_Patterns#patrones-creacionales)
- [Patrones Estructurales](https://github.com/Nikos1010/Design_Patterns#patrones-estructurales)
- [Patrones de Comportamiento](https://github.com/Nikos1010/Design_Patterns#patrones-de-comportamiento)

> Esta información fue sacada de distintos articulos y los ejemplos hechos son propios, esto simplemente son apuntes sobre lo que he entendido sobre los patrones de diseño implementados en JS, trtando de implementarlo en Node.js
Link de [refactoring guru](https://refactoring.guru/es/design-patterns/catalog).
Link de un [git hub](https://github.com/damiancipolat/Nodejs-Design-Pattern)
Link de [Patternsdev](https://www.patterns.dev/posts/classic-design-patterns/)
Link de [medium](https://medium.com/@jesusmurfontanals/builder-pattern-con-javascript-1ee3f9e2b7e9)

# Patrones Creacionales
Los patrones creacionales proporcionan varios mecanismos de creación de objetos que incrementan la flexibilidad y la reutilización del código existente.

Podemos encontrar estos patrones:
- [Singleton](https://github.com/Nikos1010/Design_Patterns#singleton)
- [Prototype](https://github.com/Nikos1010/Design_Patterns#prototype)
- [Builder](https://github.com/Nikos1010/Design_Patterns#)
- [Factory](https://github.com/Nikos1010/Design_Patterns#factory)
- [Abstract Factory](https://github.com/Nikos1010/Design_Patterns#abstract-factory)

## Singleton
Permite asegurarnos de que una clase tenga una única instancia, a la vez que proporciona un punto de acceso global a dicha instancia. 

Para entenderlo mejor, pongamos este ejemplo sencillo:

Necesitamos crear una clase para un banco, en donde guardaremos el nombre del banco, y otra informacion del banco, como lo es la cantidad de cuentas bancarias y el capital que tiene el banco, esto va aumentando según el dinero que ingresen de las cuentas. También ingresaremos informacion de las cuentas bancarias, como los id de las cuentas y el dinero que estas tienen dentro.

entonces escribiendo codigo se veria asi en JS:

```javascript
//Singleton
let instance;

class Bank {
    constructor({ 
        bankCapital,
        name,
        infoBankAccount = [], // [{"id": "1234", "money": 500}]
    }) {
        if(instance) {
            throw new Error("You can only create one instance!");
        }
        instance = this;
        this.name = name;
        this.infoBank = { 
            quantityAccount: 0, 
            bankCapital: bankCapital 
        };
        this.infoBankAccount = infoBankAccount;
    }

    bankInformation() {
        const objectToArray = [this];
        return objectToArray;
    }

    addInfoBankAccount({id, client, quantityMoney}) {
        const info = { id, client, quantityMoney };
        this.infoBankAccount.push(info);
        this.incrementAccountsAndCapital(quantityMoney);
    }

    incrementAccountsAndCapital (money) {
        this.infoBank.quantityAccount++;
        this.infoBank.bankCapital += money;
    }
}

const infoBank = {
    name: "Noith Bank",
    bankCapital: 20000,
};

const nicolasBank = Object.freeze(new Bank(infoBank));

module.exports = nicolasBank;
```

Para crear el Singleton en JS, tenemos que utilizar una variable por fuera de la clase, esta se encargara de determinar si se esta volviendo a instanciar la clase, en caso de que ocurra, mostrara un error donde dira que solo se puede instanciar una vez la clase.

Tambien podemos observar al finar el `Object.freeze`, este se encargara de congelar el objeto y que sus atributos primarios sean congelados, en este caso se congela solo el nombre, por lo tanto no puedo cambiarlo de como esta configurado en la instancia, los otros objetos pueden mutar, por lo tanto si puedo agregar o eliminar las propiedades que esten dentro de estos objectos, tambien exportamos la clase, para manipularla en el futuro.

## Prototype
Permite copiar objetos existentes sin que el código dependa de sus clases.

Como podemos observar, es crear copias en diferentes espacios de memoria, cada copia tendra las mismas funciones que el objeto original, también podemos hacer herencia de objetos y se notara el prototype. Observemos este ejemplo:

Un banco tiene muchas cuentas bancarias de distintos clientes, con diferente cantidad de dinero, diferente Ids e informacion de los clientes, como lo es su nombre, asi se veria en JS.

```javascript
//BankAccount.js
class BankAccount {
    constructor({ quantityMoney, client, id }) {
        this.quantityMoney = quantityMoney;
        this.client = client;
        this.id = id;
    }

    quantityMoney() {
        return this.quantityMoney;
    }

    depositMoney(money) {
        return (this.quantityMoney += money);
    }
}

module.exports = BankAccount;

//bank.js
const BankAccount = require('../models/Prototype/BankAccount.js');

const bankAccountOne = new BankAccount({
	quantityMoney: 500,
	nameClient:  "Leosh",
	id: "1"
});
Bank.addInfoBankAccount(bankAccountOne);
const bankAccountTwo = new BankAccount({
	quantityMoney: 800,
	nameClient: "Camil",
	id: "2"
});
Bank.addInfoBankAccount(bankAccountTwo);
Bank.infoBankAccount;
```
Como podemos observar podemos instanciar varias veces la clase, sin ningún tipo de error, siempre y cuando coloquemos la información colocada sea la misma que utilizaremos en la clase, lo unico que ha cambiado de todo esto son los valores de las propiedades, el resto es como una copia del original.

## Factory
Podemos crear objetos mediante una interfaz de fabrica, sin necesidad de especificar una clase como concreta, antes por el contrario dependiendo el valor de la propiedad creara una clase especifica. Esto se hace con el fin de no utilizar tantas veces la palabra reservada `new`.

Observemos el siguiente ejemplo:
Ya sabiendo sobre las cuentas bancarias, tambien podemos decir que segun la cuenta bancaria, se habilitara un tipo de tarjeta, que puede ser credito o debito, aplicaremos una fabrica para que se puedan crear las instacias de estas sin necesidad de estar llamando constantemente la palabra reservada `new`.

```javascript
//Card.js
class CreditCard {
    constructor({ typeCard }) {
        this.typeCard = typeCard;
        this.amountOfMoneyInAccount = 0;
        this.amountOfMoneyOwed = 0;
    }

    withdrawCash(quantityCash) {
        if (quantityCash > this.amountOfMoneyInAccount) {
            const err = {
                msg: `You cannot withdraw that amount of money, ask for more money.`,
            };
            return err;
        } else {
            this.amountOfMoneyInAccount -= quantityCash;
        }
    }

    borrowingCash(quantityCash) {
        this.amountOfMoneyInAccount = quantityCash;
        this.amountOfMoneyOwed = Math.round(quantityCash * 1.15);
    }

    totalDebt() {
        return this.amountOfMoneyOwed;
    }

    totalMoneyinAccount() {
        return this.amountOfMoneyInAccount;
    }

    payCredit(money) {
        this.amountOfMoneyOwed -= money;
    }
}

class DebitCard {
    constructor({ typeCard }) {
        this.typeCard = typeCard;
        this.amountOfMoneyInAccount = 0;
    }

    withdrawCash(quantityCash) {
        if (quantityCash > this.amountOfMoneyInAccount) {
            const err = {
                msg: `You cannot withdraw that amount of money, ask for more money.`,
            };
            return err;
        } else {
            this.amountOfMoneyInAccount -= quantityCash;
        }
    }

    totalMoneyinAccount() {
        return this.amountOfMoneyInAccount;
    }
}

exports.DebitCard = DebitCard;
exports.CreditCard = CreditCard;

//Factory.js
const { DebitCard, CreditCard } = require('../Prototype/Cards.js');

class Cardfactory {
    constructor() {
        this.cardClass = DebitCard;
    }

    createCard (options) {
        switch(options.typeCard) {
            case "Credit":
                this.cardClass = CreditCard;
                break;
            case "Debit":
                this.cardClass = DebitCard;
                break;
        }

        return new this.cardClass(options);
    }

}

module.exports = Cardfactory;

//bank.js
const Cardfactory = require('../models/Factory/Factory.js');
const BankAccount = require('../models/Prototype/BankAccount.js');

const cardFactory = new Cardfactory();

    const infoOne = {
        quantityMoney: 500,
        client: {
            name: "Leosh",
            typeCard: cardFactory.createCard({typeCard: 'Debit'}),
        },
        id: "1",
    };
    const bankAccountOne = new BankAccount(infoOne);

    const bankAccountTwo = new BankAccount({
        quantityMoney: 800,
        client: {
            name: "Camil",
            typeCard: cardFactory.createCard({ typeCard: "Credit" }),
        },
        id: "2",
    });
```

Lo primero que hacemos es crear las clases de las tarjetas, que sera una clase para tarjeta de debito y una para tarjeta de credito. Despues de esto crearemos la clase fabrica, en esta haremos una funcion `createCard` para crear los objetos, aqui se decidira segun el `typeCard` que tipo de clase se instanciara. Ya por ultimo simplemente se instancia una vez la fabrica, y cada vez que se necesite instanciar un objeta se llama la funcion de la fabrica. Ej: Primero se instancia `const cardFactory = new Cardfactory();`, despues se llama `typeCard: cardFactory.createCard({ typeCard: "Credit" })`.

### Cuando usar el Patrón Factory
- Cuando la configuración de nuestro objeto o componente implica un alto nivel de complejidad.
- Cuando necesitamos generar fácilmente diferentes instancias de objetos dependiendo del entorno en el que nos encontremos.
- Cuando estamos trabajando con muchos objetos pequeños o componentes que comparten las mismas propiedades.
- Al componer objetos con instancias de otros objetos que solo necesitan cumplir con un contrato API (también conocido como duck typing) para funcionar. Esto es útil para el desacoplamiento.
> Copiado de [patterns dev](https://www.patterns.dev/posts/classic-design-patterns/#factorypatternjavascript)

### Cuando no usar el Patrón Factory
- Cuando se aplica al tipo de problema incorrecto, este patrón puede introducir una gran complejidad innecesaria en una aplicación.
- Dado que el proceso de creación de objetos se abstrae efectivamente detrás de una interfaz, esto también puede presentar problemas con las pruebas unitarias dependiendo de cuán complejo sea este proceso.
> Copiado de [patterns dev](https://www.patterns.dev/posts/classic-design-patterns/#factorypatternjavascript)

## Abstract Factory
Este tiene como objetivo encapsular un grupo de fábricas individuales que tenga un objetivo común.

Observemos el siguiente ejemplo:
Vamos a utilizar el mismo ejemplo de las tarjetas de credito, pero esta vez utilizaremos una fabrica abstracta.

```javascript
//Card.js
class CreditCard {
    constructor({ typeCard }) {
        this.typeCard = typeCard;
        this.amountOfMoneyInAccount = 0;
        this.amountOfMoneyOwed = 0;
    }

    withdrawCash(quantityCash) {
        if (quantityCash > this.amountOfMoneyInAccount) {
            const err = {
                msg: `You cannot withdraw that amount of money, ask for more money.`,
            };
            return err;
        } else {
            this.amountOfMoneyInAccount -= quantityCash;
        }
    }

    borrowingCash(quantityCash) {
        this.amountOfMoneyInAccount = quantityCash;
        this.amountOfMoneyOwed = Math.round(quantityCash * 1.15);
    }

    totalDebt() {
        return this.amountOfMoneyOwed;
    }

    totalMoneyinAccount() {
        return this.amountOfMoneyInAccount;
    }

    payCredit(money) {
        this.amountOfMoneyOwed -= money;
    }
}

class DebitCard {
    constructor({ typeCard }) {
        this.typeCard = typeCard;
        this.amountOfMoneyInAccount = 0;
    }

    withdrawCash(quantityCash) {
        if (quantityCash > this.amountOfMoneyInAccount) {
            const err = {
                msg: `You cannot withdraw that amount of money, ask for more money.`,
            };
            return err;
        } else {
            this.amountOfMoneyInAccount -= quantityCash;
        }
    }

    totalMoneyinAccount() {
        return this.amountOfMoneyInAccount;
    }
}

exports.DebitCard = DebitCard;
exports.CreditCard = CreditCard;

//AbstractFactory.js
class AbstractCardFactory {
    constructor() {
        this.types = {};
    }

    getCard(type, props) {
        const Card = this.types[type];

        return Card ? new Card(props) : null;
    }

    registerCard(type, Card) {
        this.types[type] = Card;
    }
}

module.exports = AbstractCardFactory;

//bank.js
const AbstractCardFactory = require('../models/Factory/AbstractFactory.js');
const { DebitCard, CreditCard } = require('../models/Prototype/Cards.js');

const abstractCardFactory = new AbstractCardFactory();

abstractCardFactory.registerCard("debit", DebitCard);
abstractCardFactory.registerCard("credit", CreditCard);

const debitCardOne = abstractCardFactory.getCard("debit", {
	typeCard: "Debit",
});
const creditCardOne = abstractCardFactory.getCard("credit", { typeCard: "Credit" });
const allCards = [debitCardOne, creditCardOne];
```
Para crear una tarjeta, debemos primero registrar el tipo de tarjetas que hay, despues de registrarla con la función `registerCard`, ya podemos crear objetos con la función `getCard`, y asi de una manera sencilla podemos crear objetos que tengan cosas en comun.

## Builder
Es una manera de crear objetos complejos paso a paso, para asi elegir que crear o no de un objeto, podemos crear objetos difrentes, desde que los objetos tengan las propiedades configuradas en el builder.

Asi es un ejemplo del patrón builder en JS:

```javascript
//Client.js
class Client {
    constructor(
        nameClient,
        typePerson = "Natural",
        identity,
        cellphoneNumber,
        address
    ) {
        this.nameClient = nameClient;
        this.typePerson = typePerson;
        this.identity = identity;
        this.cellphoneNumber = cellphoneNumber;
        this.address = address;
    }

    setNameClient(nameClient) {
        this.nameClient = nameClient;
    }

    setTypePerson(typePerson) {
        this.typePerson = typePerson;
    }

    setIdentity(identity) {
        this.identity = identity;
    }

    setCellphoneNumber(cellphoneNumber) {
        this.cellphoneNumber = cellphoneNumber;
    }

    setAddress(address) {
        this.address = address;
    }
}

module.exports = Client;

//Builder.js
const Client = require('../Prototype/Client.js');

class ClientBuilder {
    constructor() {
        this.client = new Client();
    }

    withNameClient(nameClient) {
        this.client.setNameClient(nameClient);
        return this;
    }

    withTypePerson(typePerson) {
        this.client.setTypePerson(typePerson);
        return this;
    }

    withIdentity(identity) {
        this.client.setIdentity(identity);
        return this;
    }

    withCellphoneNumber(cellphoneNumber) {
        this.client.setCellphoneNumber(cellphoneNumber);
        return this;
    }

    withAddress(address) {
        this.client.setAddress(address);
        return this;
    }

    build() {
        return this.client;
    }
}

module.exports = ClientBuilder;

//client.js
const ClientBuilder = require('../models/Builder/Builder.js');

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
```
El patrón builder nos permite hacer una concatenacion mediante puntos, esto se logra llamando las funciones creadas en el Builder, cada funcion configurara una propiedad de la clase, esto se hace con el fin de que sea mas legible el codigo, y asi darse cuenta que es lo que se agrega cuando se crea una clase, para construir la instancia se llama la función `build()`.

# Patrones Estructurales
Los patrones estructurales explican cómo ensamblar objetos y clases en estructuras más grandes, a la vez que se mantiene la flexibilidad y eficiencia de estas estructuras.

# Patrones de Comportamiento
Los patrones de comportamiento tratan con algoritmos y la asignación de responsabilidades entre objetos.