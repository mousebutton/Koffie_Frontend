export default class Drink {

    constructor(drink) {
        this.name = drink.name;
        if (drink.imageUrl != '') {
            this.imageUrl = '/static/coffees/' + drink.imageUrl.name;
        }
        console.log(this);
    }
}