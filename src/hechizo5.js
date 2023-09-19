export const modifyTransFatForHighCholesterol = (donuts) => {
    donuts.forEach((element) => {
        const cholesterolAmount = parseFloat(element.nutrition_facts.nutrition.cholesterol.amount);
        if (cholesterolAmount > 12) {
            element.nutrition_facts.nutrition.fat.fat_type.trans = "3.2g";
        }
    });
};

export const modifyCarbDetailsForHighSugarDonuts = (donuts) => {
    donuts.forEach((element) => {
        const sugarAmount = parseFloat(element.nutrition_facts.nutrition.carbohydrate.carbs_detail.type.sugars.slice(0, -1));
        if (sugarAmount > 50) {
            element.nutrition_facts.nutrition.carbohydrate.carbs_detail.amount = "42g";
        }
    });
};
