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