class MainController {
    static $inject = ['taxService'];
    constructor(taxService){
        this.taxService = taxService;
    }

    inputValue = 0;
    income = 0;

    get inputValid(){
        return this.inputValue != null && /^[0-9]+(\.[0-9]?[0-9])?$/.test(this.inputValue);
    }

    get resultValue(){
        return this.taxService.getTax(this.income);
    }

    update(){
        this.income = this.inputValue;
    }

}