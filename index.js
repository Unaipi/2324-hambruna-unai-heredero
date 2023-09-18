// const getAllDonuts = async () => {
//     return fetch('https://gist.githubusercontent.com/Oskar-Dam/62e7175dc542af53a9d18cb292422425/raw/a6cce2b68ea13a77ec5ea7bdfb4df8f23f9ae95f/donuts.json')
//         .then(response => response.json())
// }

// const fetchAsyncData = async () => {
//     try {
//         const result = await getAllDonuts();

//         const donuts = result.items.item;

//         let maxSugarDonutName = ''; // Inicializamos el nombre del donut con más azúcar como un string vacío
//         let maxSugarValue = 0; // Inicializamos el valor de azúcar

//         donuts.forEach((element) => {
//             const sugarValue = element.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars;

//             const numericSugar = parseFloat(sugarValue.slice(0, sugarValue.length - 1));

//             if (numericSugar > maxSugarValue) {
//                 maxSugarValue = numericSugar;
//                 maxSugarDonutName = element.name; // Almacena el nombre del donut con más azúcar
//             }
//         });

//         console.log("Donut con más azúcar:", maxSugarDonutName);
//         console.log("Cantidad de azúcar:", maxSugarValue);


//     } catch (error) {
//         console.log(error.message)
//     }
// }

// fetchAsyncData()

const getAllDonuts = async () => {
    try {
        const response = await fetch('https://gist.githubusercontent.com/Oskar-Dam/62e7175dc542af53a9d18cb292422425/raw/a6cce2b68ea13a77ec5ea7bdfb4df8f23f9ae95f/donuts.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message)
    }
}

const findDonutWithMostSugar = (donuts) => {
    let maxSugarDonutName = '';
    let maxSugarValue = 0;

    donuts.forEach((element) => {
        const sugarValue = element.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars;
        const numericSugar = parseFloat(sugarValue.slice(0, sugarValue.length - 1));

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

const fetchAndProcessDonuts = async () => {
    try {
        const result = await getAllDonuts();
        const donuts = result.items.item;

        const donutWithMostSugar = findDonutWithMostSugar(donuts);

        console.log("Donut con más azúcar:", donutWithMostSugar.name);
        console.log("Cantidad de azúcar:", donutWithMostSugar.sugar);
    } catch (error) {
        console.log(error.message);
    }
}


fetchAndProcessDonuts();