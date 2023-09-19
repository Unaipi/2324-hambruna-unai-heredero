
//ariketa 1
export const findDonutWithMostSugar = (donuts) => {
    let maxSugarDonutName = '';
    let maxSugarValue = 0;

    donuts.forEach((element) => {
        const sugarValue = element.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars;
        const numericSugar = Number(sugarValue.slice(0, sugarValue.length - 1));

        if (numericSugar > maxSugarValue) {
            maxSugarValue = numericSugar;
            maxSugarDonutName = element.name;
        }
    });

    return {
        name: maxSugarDonutName,
        sugar: maxSugarValue,
    };
}

export const findDonutWithMostIron = (donuts) => {
    let maxIronDonutName = '';
    let maxIronValue = 0;

    donuts.forEach((element) => {
        const ironValue = parseFloat(element.nutrition_facts.nutrition.vitamines.find(vitamin => vitamin.type === "Iron").percent);

        if (ironValue > maxIronValue) {
            maxIronValue = ironValue;
            maxIronDonutName = element.name;
        }
    });

    return {
        name: maxIronDonutName,
        iron: maxIronValue,
    };
};

export const findDonutWithMostProtein = (donuts) => {
    let maxProteinDonutName = '';
    let maxProteinValue = 0;

    donuts.forEach((element) => {
        const proteinValue = parseFloat(element.nutrition_facts.nutrition.proteine);

        if (proteinValue > maxProteinValue) {
            maxProteinValue = proteinValue;
            maxProteinDonutName = element.name;
        }
    });

    return {
        name: maxProteinDonutName,
        protein: maxProteinValue,
    };
};


export const findDonutsWithLeastFiber = (donuts) => {
    let minFiberDonuts = [];
    let minFiberValue = 999999999999; //lo siento

    donuts.forEach((element) => {
        const fiberValue = parseFloat(element.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.fibre);

        if (fiberValue) {
            if (fiberValue < minFiberValue) {
                minFiberValue = fiberValue;
                minFiberDonuts = [element.name];
            } else if (fiberValue === minFiberValue) {
                minFiberDonuts.push(element.name);
            }
        }
    });

    return {
        donuts: minFiberDonuts,
        fiber: minFiberValue,
    };
};





