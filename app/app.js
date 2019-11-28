angular.module('tax-calculator', [])
       .constant('taxRates',[
            { bandMax: 48000, rate: 0.2100 },
            { bandMax: 14000, rate: 0.1150 },
            { bandMax: 70000, rate: 0.3150 },
            { bandMax: Number.MAX_VALUE, rate: 0.3550 }
       ])
       .controller('mainController', MainController)
       .service('taxService',['taxRates', TaxService]);