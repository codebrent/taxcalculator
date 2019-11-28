describe('TaxService', () => {

    const taxRates = [
        { bandMax: 48000, rate: 0.2100 },
        { bandMax: 14000, rate: 0.1150 },
        { bandMax: 70000, rate: 0.3150 },
        { bandMax: Number.MAX_VALUE, rate: 0.3550 }
    ];
    let service;

    beforeEach(() => {
        service = new TaxService(taxRates);
    });

    it('Should exist',()=>{
        expect(service).not.toBeUndefined();
    });

    describe('getTax(income): ',()=>{
        it('Should return tax of 0 on income of 0', () => {
            const result = service.getTax(0);
            expect(result).toBe(0);
        });
    
        it('Should return tax of 1,610.00 on income of 14,000', () => {
            const result = service.getTax(14000);
            expect(result).toBe(1610);
        });
    
        it('Should return tax of 8,750.00 on income of 48,000', () => {
            const result = service.getTax(48000);
            expect(result).toBe(8750);
        });
    
        it('Should return tax of 15,680.00 on income of 70,000', () => {
            const result = service.getTax(70000);
            expect(result).toBe(15680);
        });
    
        it('Should return tax of 19,230.00 on income of 80,000', () => {
            const result = service.getTax(80000);
            expect(result).toBe(19230);
        });
    
        it('Should throw an error if invalid input', () => {
            expect(()=>{
                const result = service.getTax('notanumber');
            }).toThrow(new Error('Invalid input'))
        });    
    });

    describe('createTiers(taxRates)',() => {
        it('Should return the same number of tiers as tax rates', () => {
            const result = service.createTiers(taxRates);
            expect(result.length).toBe(taxRates.length);
        });

        it('Should return bandMax for the lowest tier', () => {
            const result = service.createTiers(taxRates);
            expect(result[0].tier).toBe(14000);
            expect(result[0].rate).toBe(0.115);
        });

        it('Should return difference between bandMax and next lowest bandMax for remaining tiers', () => {
            const result = service.createTiers(taxRates);
            expect(result[1].tier).toBe(34000);
            expect(result[1].rate).toBe(0.21);
            expect(result[2].tier).toBe(22000);
            expect(result[2].rate).toBe(0.315);
            expect(result[3].tier > 1000000).toBe(true);
            expect(result[3].rate).toBe(0.355);
        });
        

    });

});
