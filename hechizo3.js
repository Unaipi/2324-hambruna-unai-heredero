export const listDonutBatters = (donuts) => {

    const donutBatters = [];

    donuts.forEach((element) => {
        const donutName = element.name;
        const batters = element.batters.batter.map(batter => batter.type);

        donutBatters.push({
            name: donutName,
            batters: batters
        });
    });

    return donutBatters;
};


export const listDonutToppings = (donuts) => {

    const donutToppings = [];

    donuts.forEach((element) => {
        const donutName = element.name;
        const toppings = element.topping.map(element => element.type);

        donutToppings.push({
            name: donutName,
            toppings: toppings
        });
    });

    return donutToppings;
};
