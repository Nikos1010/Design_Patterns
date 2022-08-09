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
        return this.quantityMoney += money;
    }
}

class Client {
    constructor({  }) {

    }
}
//Instances Client

//Instances BankAccount
const robertAccount = new BankAccount({
    quantityMoney: 300,
    client: {
        name: 'Robert',
        lastName: 'College'
    }
});

//Methods
robertAccount.depositMoney(20);
console.log(robertAccount.quantityMoney);



// class Dog {
//     constructor(name) {
//         this.name = name;
//     }

//     bark() {
//         return `Woof!`;
//     }
// }

// const dog1 = new Dog("Daisy");
// const dog2 = new Dog("Max");
// const dog3 = new Dog("Spot");

// console.log(Dog.prototype);
// // constructor: ƒ Dog(name, breed) bark: ƒ bark()

// console.log(dog1.__proto__);
// // constructor: ƒ Dog(name, breed) bark: ƒ bark()

// Dog.prototype.play = () => console.log("Playing now!");

// dog1.play();

// class SuperDog extends Dog {
//     constructor(name) {
//         super(name);
//     }

//     fly() {
//         return "Flying!";
//     }
// }

// const dog4 = new SuperDog("Daisy");
// dog4.bark();
// dog4.fly();


// const dog = {
//     bark() {
//         console.log(`Woof!`);
//     },
// };

// const pet1 = Object.create(dog);

// pet1.bark(); // Woof!
// console.log("Direct properties on pet1: ", Object.keys(pet1));
// console.log("Properties on pet1's prototype: ", Object.keys(pet1.__proto__));