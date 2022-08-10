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

# Patrones Creacionales
Los patrones creacionales proporcionan varios mecanismos de creación de objetos que incrementan la flexibilidad y la reutilización del código existente.

Podemos encontrar estos patrones:
- [Singleton](https://github.com/Nikos1010/Design_Patterns#)
- [Prototype](https://github.com/Nikos1010/Design_Patterns#)
- [Builder](https://github.com/Nikos1010/Design_Patterns#)
- [Abstract Factory](https://github.com/Nikos1010/Design_Patterns#)
- [Factory Method](https://github.com/Nikos1010/Design_Patterns#)

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

    addInfoBankAccount({id, nameClient, quantityMoney}) {
        const info = {id, nameClient, quantityMoney};
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

Tambien podemos observar al finar el `Object.freeze`, este se encargara de congelar el objeto y que sus atributos primarios sean congelados, en este caso se congela solo el nombre, por lo tanto no puedo cambiarlo de como esta configurado en la instancia, los otros objetos pueden mutar, por lo tanto si puedo agregar o eliminar las propiedades que esten dentro de estos objectos.

# Patrones Estructurales
Los patrones estructurales explican cómo ensamblar objetos y clases en estructuras más grandes, a la vez que se mantiene la flexibilidad y eficiencia de estas estructuras.

# Patrones de Comportamiento
Los patrones de comportamiento tratan con algoritmos y la asignación de responsabilidades entre objetos.
