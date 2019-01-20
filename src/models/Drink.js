export default class Drink {

    constructor(drink) {
        console.log(drink);
        this.name = drink.name;
        if (drink.imageUrl != '') {
            this.imageUrl =  drink.imageUrl;
        }
    }
}