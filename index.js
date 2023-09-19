const getAllDonuts = async () => {
    try {
        const response = await fetch('https://gist.githubusercontent.com/Oskar-Dam/62e7175dc542af53a9d18cb292422425/raw/a6cce2b68ea13a77ec5ea7bdfb4df8f23f9ae95f/donuts.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message)
    }
}


//ariketa 1
const findDonutWithMostSugar = (donuts) => {
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

const findDonutWithMostIron = (donuts) => {
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

const findDonutWithMostProtein = (donuts) => {
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


const findDonutsWithLeastFiber = (donuts) => {
    let minFiberDonuts = [];
    let minFiberValue = 999999999999;

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


//ariketa 2


const listAllDonutsWithCalories = (donuts) => {
    const donutsWithCalories = [];

    donuts.forEach((element) => {
        const donutName = element.name;
        const calories = element.nutrition_facts.nutrition.calories;

        donutsWithCalories.push({
            name: donutName,
            calories: calories
        });
    });

    return donutsWithCalories;

};

const listAllDonutsWithCarbohydrates = (donuts) => {
    const donutsWithCarbohydrates = [];

    donuts.forEach((element) => {
        const donutName = element.name;
        const carbohydrates = element.nutrition_facts.nutrition.carbohydrate.carbs_detail.amount;

        donutsWithCarbohydrates.push({
            name: donutName,
            carbohydrates: carbohydrates
        });
    });

    return donutsWithCarbohydrates;
};


const calculateAverageCalories = (donuts) => {
    let totalCalories = 0;

    donuts.forEach((element) => {
        const calories = element.nutrition_facts.nutrition.calories;
        totalCalories += calories;
    });

    const averageCalories = totalCalories / donuts.length;
    return averageCalories;
};

const calculateTotalSaturatedFat = (donuts) => { 
    let totalSaturatedFat = 0;

    donuts.forEach((element) => {
        const saturatedFat = parseFloat(element.nutrition_facts.nutrition.fat.fat_type.saturated);

        if (saturatedFat) {
            totalSaturatedFat += saturatedFat;
        }
    });

    return totalSaturatedFat;
};

const calculateAverageVitaminPercentages = (donuts) => {
    // const totalDonuts = donuts.length;
    const vitaminAArray = [];
    const vitaminCArray = [];
    const calciumArray = [];
    const ironArray = [];

    donuts.forEach((element) => {
        const vitamines = element.nutrition_facts.nutrition.vitamines;

        vitamines.forEach((vitamin) => {
            if (vitamin.type === "Vitamin A") {
                vitaminAArray.push(parseFloat(vitamin.percent));
            } else if (vitamin.type === "Vitamin C") {
                vitaminCArray.push(parseFloat(vitamin.percent));
            } else if (vitamin.type === "Calcium") {
                calciumArray.push(parseFloat(vitamin.percent));
            } else if (vitamin.type === "Iron") {
                ironArray.push(parseFloat(vitamin.percent));
            }
        });
    });

    const calculateAverage = (vitaminArray) => {
        if (vitaminArray.length === 0) {
            return 0;
        }

        const totalPercentage = vitaminArray.reduce((acc, cur) => acc + cur);
        return totalPercentage / vitaminArray.length;
    };

    return {
        vitaminA: calculateAverage(vitaminAArray),
        vitaminC: calculateAverage(vitaminCArray),
        calcium: calculateAverage(calciumArray),
        iron: calculateAverage(ironArray),
    };
};

//ariketa 3
const listDonutBatters = (donuts) => {

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


const listDonutToppings = (donuts) => {

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


//ariketa 4(4 monedas de plata (ppu))

const calculateDonutsAndChange = (donuts, budget) => {
    const donutsCount = {};
    let remainingBudget = budget;

    donuts.forEach((element) => {
        const donutName = element.name;
        const donutPrice = element.ppu;

        const donutsComprables = Math.floor(remainingBudget / donutPrice);
        donutsCount[donutName] = donutsComprables;
        remainingBudget -= donutsComprables * donutPrice;
    });

    return {
        donutsCount: donutsCount,
        remainingBudget: remainingBudget,
    };
};


const fetchAndProcessDonuts = async () => {
    try {
        const result = await getAllDonuts();

        const budget = 4;
        const donuts = result.items.item;

        const donutWithMostSugar = findDonutWithMostSugar(donuts);
        const donutWithMostHierro = findDonutWithMostIron(donuts);
        const donutConMasProteina = findDonutWithMostProtein(donuts);
        const donutsConMenosFibra = findDonutsWithLeastFiber(donuts);

        const donutsConCalorias = listAllDonutsWithCalories(donuts);
        const donutsConCarbohidratos = listAllDonutsWithCarbohydrates(donuts);

        const averageCalories = calculateAverageCalories(donuts); // Calcular la media de calorías
        const totalSaturatedFat = calculateTotalSaturatedFat(donuts);

        const averageVitaminPercentages = calculateAverageVitaminPercentages(donuts);

        const donutBatters = listDonutBatters(donuts);

        const donutToppings = listDonutToppings(donuts);

        const donutsAndChange = calculateDonutsAndChange(donuts, budget)
        //ariketa 1
        console.log("Donut con más azúcar:", donutWithMostSugar.name);
        console.log("Cantidad de azúcar:", donutWithMostSugar.sugar);
        console.log("")
        console.log("Donut con más hierro:", donutWithMostHierro.name);
        console.log("Cantidad de hierro:", donutWithMostHierro.iron);
        console.log("")
        console.log("Donut con más proteína:", donutConMasProteina.name);
        console.log("Cantidad de proteína:", donutConMasProteina.protein);
        console.log("")
        console.log("Donuts con menos fibra:", donutsConMenosFibra.donuts);
        console.log("Cantidad de fibra mínima:", donutsConMenosFibra.fiber);
        console.log("")

        //ariketa 2
        console.log("Donuts con sus calorías: ")
        donutsConCalorias.forEach((element) => {
            console.log(`Donut: ${element.name}, Calorías: ${element.calories}`);
        });
        console.log("")

        console.log("Donuts con sus Carbohidratos: ")
        donutsConCarbohidratos.forEach((element) => {
            console.log(`Donut: ${element.name}, Carbohidratos: ${element.carbohydrates}`);
            console.log("")
        });
        console.log("Media de calorías de todos los donuts:", averageCalories);
        console.log("Suma de grasas saturadas de todos los donuts:", totalSaturatedFat + "g");
        console.log("")

        console.log("Porcentaje promedio de Vitamina A:", averageVitaminPercentages.vitaminA + "%");
        console.log("Porcentaje promedio de Vitamina C:", averageVitaminPercentages.vitaminC + "%");
        console.log("Porcentaje promedio de Calcio:", averageVitaminPercentages.calcium + "%");
        console.log("Porcentaje promedio de Hierro:", averageVitaminPercentages.iron + "%");
        console.log("")

        console.log("Donuts con sus batters: ")
        donutBatters.forEach((element) => {
            console.log(`Donut: ${element.name}`);
            console.log(`Batters: ${element.batters}`);
            console.log("")
        });

        console.log("Donuts con sus toppings: ")
        donutToppings.forEach((element) => {
            console.log(`Donut: ${element.name}`);
            console.log(`Toppings: ${element.toppings}`);
            console.log("")
        });

        console.log("Cantidad de donuts que puedes comprar de cada tipo:");
        for (const donutName in donutsAndChange.donutsCount) {
            console.log(`${donutName}: ${donutsAndChange.donutsCount[donutName]}`);
        }

        console.log("Dinero restante:", donutsAndChange.remainingBudget + " unidades monetarias");




    } catch (error) {
        console.log(error.message);
    }
}


fetchAndProcessDonuts();