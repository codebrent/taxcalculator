class TaxService {
    static $inject = ['taxRates'];

    constructor(taxRates){
        this.taxTiers = this.createTiers(taxRates);
    }

    getTax(income, taxTiers = this.taxTiers){
        // Regex for number of 0 or more decimal places
        if (!/^[0-9]+(\.[0-9]*)?$/.test(income)){
            throw new Error('Invalid input');
        };
        let residual = income;
        let tax = 0;
        let idx = 0;
        while (idx < taxTiers.length - 1 && residual > taxTiers[idx].tier){
            const { tier, rate } = taxTiers[idx];
            tax += tier * rate;
            residual -= tier;
            idx++;
        }
        tax += residual * taxTiers[idx].rate;
        return tax;
    }

    createTiers(taxRates){
        if (!Array.isArray(taxRates) || taxRates.length == 0){
            return [];
        }
        const byBandMax = (a, b) => (a.bandMax > b.bandMax) ? 1 : -1;
        taxRates.sort(byBandMax);
        let tiers = [{ 
            tier: taxRates[0].bandMax, 
            rate: taxRates[0].rate
         }];
        for(let i=1; i<taxRates.length; i++){
            tiers.push({
                tier: taxRates[i].bandMax - taxRates[i-1].bandMax,
                rate: taxRates[i].rate
            })
        }
        return tiers;        
    }

}