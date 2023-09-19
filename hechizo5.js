export const modifyTransFatForHighCholesterolDonuts = (donuts) => {

    donuts.forEach((element) => {
        let fat= element.nutrition_facts.nutrition.cholesterol.amount;
        const cholesterolAmount = parseFloat(element.nutrition_facts.nutrition.cholesterol.amount);
        if (cholesterolAmount > 12) {
            
            element.nutrition_facts.nutrition.fat.fat_type.trans = "3.2g";
        }
    });
    return transFatBeforeChange;
};

