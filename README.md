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
- [Builder](https://github.com/Nikos1010/Design_Patterns#builder)
- [Factory](https://github.com/Nikos1010/Design_Patterns#factory)
- [Abstract Factory](https://github.com/Nikos1010/Design_Patterns#abstract-factory)

## Singleton
Permite asegurarnos de que una clase tenga una única instancia, a la vez que proporciona un punto de acceso global a dicha instancia.

Para entenderlo mejor, pongamos este ejemplo sencillo:

Necesitamos crear una clase para un banco, en donde guardaremos el nombre del banco, y otra informacion del banco, como lo es la cantidad de cuentas bancarias y el capital que tiene el banco de una manera libre. También ingresaremos informacion de las cuentas bancarias, como los id de las cuentas, nombre del cliente y las tarjetas que maneja.

entonces escribiendo codigo se veria asi en JS:

```javascript
//Singleton
let instance;

class Bank {
    constructor({
        bankCapital,
        name,
        infoBankAccount = [], // [{"id": "1234", "client": "{}"}]
    }) {
        if (instance) {
            throw new Error("You can only create one instance!");
        }
        instance = this;
        this.name = name;
        this.infoBank = {
            quantityAccount: 0,
            bankCapital: bankCapital,
        };
        this.infoBankAccount = infoBankAccount;
    }

    bankInformation() {
        const objectToArray = [this];
        return objectToArray;
    }

    addInfoBankAccount({ id, client }) {
        const info = { id, client };
        this.infoBankAccount.push(info);
        this.incrementAccounts();
    }

    incrementAccounts() {
        this.infoBank.quantityAccount++;
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
    constructor({ client, id }) {
        this.client = client;
        this.id = id;
    }
    #quantityMoney;

    getBalance() {
        return this.#quantityMoney;
    }

    setBalance(val) {
        this.#quantityMoney = val;
    }

    depositMoney(money) {
        return (this.#quantityMoney += money);
    }
}

module.exports = BankAccount;

//bank.js
const BankAccount = require('../models/Prototype/BankAccount.js');

const bankAccountOne = new BankAccount({
	name:  "Leosh",
	id: "1"
});
bankAccountOne.setBalance(500);
Bank.addInfoBankAccount(bankAccountOne);

const bankAccountTwo = new BankAccount({
	name: "Camila",
	id: "2"
});
bankAccountTwo.setBalance(800);
Bank.addInfoBankAccount(bankAccountTwo);
Bank.infoBankAccount;
```
Como podemos observar podemos instanciar varias veces la clase, sin ningún tipo de error, siempre y cuando coloquemos la misma información que utilizaremos en la clase, lo unico que ha cambiado de todo esto son los valores de las propiedades, el resto es como una copia del original.

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
	client: {
		name: "Leosh",
		typeCard: cardFactory.createCard({typeCard: 'Debit'}),
	},
	id: "1",
};
bankAccountOne.setBalance(500);
const bankAccountOne = new BankAccount(infoOne);

const bankAccountTwo = new BankAccount({
	client: {
		name: "Camila",
		typeCard: cardFactory.createCard({ typeCard: "Credit" }),
	},
	id: "2",
});
bankAccountTwo.setBalance(800);
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

- [Proxy](https://github.com/Nikos1010/Design_Patterns#proxy)

## Proxy
Es un sustituto de otro objeto. En otras palabras el que recibe los datos y decide que se harán con estos, si los manejara el objeto original, o se rechazaran los datos, o haran otro proceso.

Tomemos el ejemplo de cliente, y ahora apliquemos un Proxy para poder comprobar que el nombre ingresado tenga mas de 2 caracteres al igual que la identificacion, que el tipo de persona aceptado solo sea Natural o Juridica, mostremoslo en JS:

```javascript
//proxy.js
const ProxyClient = {
    set: (obj, prop, value) => {
        if (prop === "nameClient" && value.length < 2) {
            console.log(`You need to provide a valid name.`);
        } else if (prop === "identity" && value.length < 2) {
            console.log(`You need to provide a valid identity.`);
        } else if (prop === "typePerson") {
            if (value !== "Natural" || value !== "Juridica"){
                console.log(
                    `You need to provide a valid type person ('Natural' or 'Juridica').`
                );
            }
        } else {
            console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`);
            obj[prop] = value;
        }
    },

    get: (obj, prop) => {
        if (!obj[prop]) {
            console.log(
                `Hmm.. this property doesn't seem to exist on the target object`
            );
        } else {
            console.log(`The value of ${prop} is ${obj[prop]}`);
        }
    }
}

module.exports = ProxyClient;

//client.js
const ClientBuilder = require('../models/Builder/Builder.js');
const ProxyClient = require('../Structural/Proxy/proxy.js');

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
```

Este proxy nos esta ayudando a hacer una validación, tanto para obtener datos de clientes, como para configurar estos datos del cliente, cuando instanciamos el Proxy le pasamos dos parametros, el objeto que el Proxy sustituira y el segundo parametro son los metodos del proxy que se van a llevar a cabo, este es un ejemplo donde solo se obtendra ciertos valores, y se cambiaran si cumple con los requisitos del Proxy.

# Patrones de Comportamiento
Los patrones de comportamiento tratan con algoritmos y la asignación de responsabilidades entre objetos.

- [Observer](https://github.com/Nikos1010/Design_Patterns#observer)
- [Command](https://github.com/Nikos1010/Design_Patterns#command)

## Observer
Este es un patrón de diseño que permite definir un mecanismo de suscripción para notificar a varios objetos sobre cualquier evento que le suceda al objeto que están observando.

Con lo dicho, es simplemente un patrón encargado de observar un objeto, para que según el cambio que esten esperando que pase, ellos se encargarán de notificar esto a otros objetos, observemos un ejemplo:

Según los cambios que se hagan en las cuentas bancarias, como lo es ingresar un deposito en la cuenta bancaria, o configurar la cantidad de dinero que tiene la cuenta bancaria, para esto se mostrara un mensaje en consola, sobre este cambio.

```javascript
//ObserverList.js
class ObserverList {
    constructor() {
        this.observerList = [];
    }

    add(obj) {
        return this.observerList.push(obj);
    }

    count() {
        return this.observerList.length;
    }

    get(index) {
        if(index > -1) {
            return this.observerList[index];
        }
    }

    indexOf(obj) {
        this.observerList.forEach((observer, index) => {
            if(observer === obj){
                return index;
            }
        });
        return -1;
    }

    removeAt(index) {
        this.observerList.splice(index, 1);
    }
}

class Observer {
    notify(subject){
        console.log(`Cambio: ${subject}`);
    }
}

exports.ObserverList = ObserverList;
exports.Observer = Observer;

//Subject.js
const { ObserverList } = require('./ObserverList.js');

class Subject {
    constructor() {
        this.observers = new ObserverList();
    }

    addObserver(observer) {
        this.observers.add(observer);
    }

    removeObserver(observer) {
        this.observers.removeAt(this.observers.indexOf(observer, 0));
    }

    notify(context) {
        this.observers.observerList.forEach((_, index) => {
            this.observers.get(index).notify(context);
        });
    }
}

module.exports = Subject;

//BankAccountSubject.js
const Subject = require("./Subject");

class BankAccountSubject extends Subject {
    constructor({ client, id }) {
        super();
        this.client = client;
        this.id = id;
    }
    #quantityMoney;

    getBalance() {
        return this.#quantityMoney;
    }

    setBalance(val) {
        this.notify("money was changed");
        this.#quantityMoney = val;
    }

    depositMoney(money) {
        this.notify("money was deposited");
        return (this.#quantityMoney += money);
    }

    notify(context) {
        super.notify(context);
    }
}

module.exports = BankAccountSubject;

//bank.js
const { Observer } = require('../Behavioral/Observer/ObserverList.js');
const BankAccountSubject = require('../Behavioral/Observer/BankAccountSubject.js');
const Cardfactory = require('../models/Factory/Factory.js');

const cardFactory = new Cardfactory();

const bankAccountThree = new BankAccountSubject({
client: {
		name: "Uver",
		typeCard: cardFactory.createCard({ typeCard: "Credit" }),
	},
	id: "2",
});
const observerOne = new Observer();
const observerTwo = new Observer();
const observerThree = new Observer();
bankAccountThree.addObserver(observerOne);
bankAccountThree.addObserver(observerTwo);
bankAccountThree.addObserver(observerThree);

bankAccountThree.setBalance(500);
bankAccountThree.depositMoney(300);

const bankAccountFour = new BankAccountSubject({
	client: {
		name: "June",
		typeCard: cardFactory.createCard({ typeCard: "Debit" }),
	},
	id: "2",
});
const observerFour = new Observer();
const observerFive = new Observer();
bankAccountFour.addObserver(observerFour);
bankAccountFour.addObserver(observerFive);
bankAccountFour.addObserver(observerThree);

bankAccountFour.setBalance(1000);
bankAccountFour.depositMoney(200);
```

Como podemos analizar en el anterior ejercicio, tenemos unos observadores que se encargaran de estar constantemente observando los cambios del objeto, cada que hay un cambio estos notificaran a otro objeto (En el ejemplo se muestra por consola), para que el observador vigile, debe estar suscrito al sujeto a vigilar, si no, nunca lo vigilara.

## Command
EL patrón Command convierte una solicitud en un objeto independiente que contiene información sobre la solicitud. Esta transformación te permite parametrizar los métodos con diferentes solicitudes, retrasar o poner en cola la ejecución de una solicitud y soportar operaciones que no se pueden realizar.
> Copiado de [refactory guru](https://refactoring.guru/es/design-patterns/command)

```javascript
//BankAccount.js
class BankAccount {
    constructor({ client, id }) {
        this.client = client;
        this.id = id;
        this.accountMoney = 0;
        this.movementHistory = [];
    }
    #quantityMoney;

    getBalance() {
        return this.#quantityMoney;
    }

    setBalance(val) {
        this.#quantityMoney = val;
    }

    executeCommand(command) {
        this.accountMoney = command.execute(this.accountMoney);
        this.movementHistory.push(command);
    }

    undo() {
        const command = this.movementHistory.pop();
        this.accountMoney = command.undo(this.accountMoney);
    }
}

module.exports = BankAccount;

//Comand.js
class DepositMoney {
    constructor(valueToAdd) {
        this.valueToAdd = valueToAdd;
    }

    execute(currentValue) {
        return currentValue + this.valueToAdd;
    }

    undo (currentValue) {
        return currentValue - this.valueToAdd;
    }
}

class WithdrawMoney {
    constructor(valueToSubstract) {
        this.valueToSubstract = valueToSubstract;
    }

    execute(currentValue) {
        return currentValue - this.valueToSubstract;
    }

    undo(currentValue) {
        return currentValue + this.valueToSubstract;
    }
}

exports.DepositMoney = DepositMoney;
exports.WithdrawMoney = WithdrawMoney;

//bank.js
const { DepositMoney, WithdrawMoney } = require('../Behavioral/Command/Command.js');
const BankAccount = require('../models/Prototype/BankAccount.js');

const Noith = new BankAccount({
	client: {
		name: "Uver",
	},
	id: "2",
});
Noith.executeCommand(new DepositMoney(500));
Noith.executeCommand(new WithdrawMoney(100));
console.log(Noith);
Noith.undo();
console.log(Noith);
```
Como podemos notar el patrón command se encarga de transpasar una funcionalidad simple a un objeto, con el objetivo que se pueda utilizar en varias clases, también para que la clase tenga un encapsulamiento de las operaciones que puede hacer, simplemente se vera la función `executeCommand` y `undo`, en donde se puede traer cualquier tipo de comando, desde que este ya este definido anteriormente. Esto también ayuda que la clase no tenga muchas funcionalidades dentro suyo que hagan distintas tareas, si no por el contrario encargarse especificamente de sus funciones primordiales, y delegar esas funciones simples a otro objeto.