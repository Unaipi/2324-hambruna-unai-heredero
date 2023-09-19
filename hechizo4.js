export const calculateDonutsAndChange = (donuts, budget) => {
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