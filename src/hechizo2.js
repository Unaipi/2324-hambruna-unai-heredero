export const listAllDonutsWithCalories = (donuts) => {
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

export const listAllDonutsWithCarbohydrates = (donuts) => {
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


export const calculateAverageCalories = (donuts) => {
    let totalCalories = 0;

    donuts.forEach((element) => {
        const calories = element.nutrition_facts.nutrition.calories;
        totalCalories += calories;
    });

    const averageCalories = totalCalories / donuts.length;
    return averageCalories;
};

export const calculateTotalSaturatedFat = (donuts) => {
    let totalSaturatedFat = 0;

    donuts.forEach((element) => {
        const saturatedFat = parseFloat(element.nutrition_facts.nutrition.fat.fat_type.saturated);

        if (saturatedFat) {
            totalSaturatedFat += saturatedFat;
        }
    });

    return totalSaturatedFat;
};

export const calculateAverageVitaminPercentages = (donuts) => {
    /// const totalDonuts = donuts.length;
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

        const totalPercentage = vitaminArray.reduce((acc, cur) => acc + cur, 0);
        return totalPercentage / vitaminArray.length;
    };

    return {
        vitaminA: calculateAverage(vitaminAArray),
        vitaminC: calculateAverage(vitaminCArray),
        calcium: calculateAverage(calciumArray),
        iron: calculateAverage(ironArray),
    };
};