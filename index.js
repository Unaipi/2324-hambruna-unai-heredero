import {
    findDonutWithMostSugar,
    findDonutWithMostIron,
    findDonutWithMostProtein,
    findDonutsWithLeastFiber
} from "./src/hechizo1.js";

import {
    listAllDonutsWithCalories,
    listAllDonutsWithCarbohydrates,
    calculateAverageCalories,
    calculateTotalSaturatedFat,
    calculateAverageVitaminPercentages
} from "./src/hechizo2.js";

import {
    listDonutBatters,
    listDonutToppings
} from "./src/hechizo3.js";

import {
    calculateDonutsAndChange
} from "./src/hechizo4.js";

import {
    modifyTransFatForHighCholesterol,
    modifyCarbDetailsForHighSugarDonuts

} from "./src/hechizo5.js";

import {
    getAllDonuts
} from "./service/service.js"



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

        //const modifyTransFat = modifyTransFatForHighCholesterolDonuts(donuts)

        //ariketa 1

        console.log("****************HECHIZO 1****************")
        console.log("Donut con más azúcar:", donutWithMostSugar.name);
        console.log("Cantidad de azúcar:", donutWithMostSugar.sugar);
        console.log("-----------");
        console.log("Donut con más hierro:", donutWithMostHierro.name);
        console.log("Cantidad de hierro:", donutWithMostHierro.iron);
        console.log("-----------");
        console.log("Donut con más proteína:", donutConMasProteina.name);
        console.log("Cantidad de proteína:", donutConMasProteina.protein);
        console.log("-----------");
        console.log("Donuts con menos fibra:", donutsConMenosFibra.donuts);
        console.log("Cantidad de fibra mínima:", donutsConMenosFibra.fiber);
        console.log("-----------");

        //hechizo 2
        console.log("****************HECHIZO 2****************")
        console.log("Donuts con sus calorías: ")
        donutsConCalorias.forEach((element) => {
            console.log(`Donut: ${element.name}, Calorías: ${element.calories}`);
        });
        console.log("-----------");

        console.log("Donuts con sus Carbohidratos: ")
        donutsConCarbohidratos.forEach((element) => {
            console.log(`Donut: ${element.name}, Carbohidratos: ${element.carbohydrates}`);
            console.log("-----------");
        });
        console.log("Media de calorías de todos los donuts:", averageCalories);
        console.log("Suma de grasas saturadas de todos los donuts:", totalSaturatedFat + "g");
        console.log("-----------");

        console.log("Porcentaje promedio de Vitamina A:", averageVitaminPercentages.vitaminA + "%");
        console.log("Porcentaje promedio de Vitamina C:", averageVitaminPercentages.vitaminC + "%");
        console.log("Porcentaje promedio de Calcio:", averageVitaminPercentages.calcium + "%");
        console.log("Porcentaje promedio de Hierro:", averageVitaminPercentages.iron + "%");
        console.log("-----------");

        //hechizo 3
        console.log("****************HECHIZO 2****************")
        console.log("Donuts con sus batters: ")
        donutBatters.forEach((element) => {
            console.log(`Donut: ${element.name}`);
            console.log(`Batters: ${element.batters}`);
            console.log("-----------");
        });

        console.log("Donuts con sus toppings: ")
        donutToppings.forEach((element) => {
            console.log(`Donut: ${element.name}`);
            console.log(`Toppings: ${element.toppings}`);
            console.log("-----------");
        });

        //hechizo 4
        console.log("****************HECHIZO 4****************")
        console.log("Cantidad de donuts que puedes comprar de cada tipo:");
        for (const donutName in donutsAndChange.donutsCount) {
            console.log(`${donutName}: ${donutsAndChange.donutsCount[donutName]}`);
        }

        console.log("Dinero restante:", donutsAndChange.remainingBudget.toFixed(2) + "€");

        //ariketa 5
        console.log("****************HECHIZO 5****************")
        modifyTransFatForHighCholesterol(donuts);
        donuts.forEach((element) => {
            console.log("Donut:", element.name);
            console.log("Grasas Trans:", element.nutrition_facts.nutrition.fat.fat_type.trans);
            console.log("-----------");
        });

        modifyCarbDetailsForHighSugarDonuts(donuts); // Modificar los detalles de carbohidratos de los donuts con azúcar > 50g

        // Mostrar los donuts con las modificaciones
        donuts.forEach((element) => {
            console.log("Donut:", element.name);
            console.log("Detalles de Carbs:", element.nutrition_facts.nutrition.carbohydrate.carbs_detail.amount);
            console.log("-----------");
        });



















    } catch (error) {
        console.log(error.message);
    }
}


fetchAndProcessDonuts();