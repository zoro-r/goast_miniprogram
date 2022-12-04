"use strict";
exports.__esModule = true;
exports.calcSalary = void 0;
var maxBase = 34188;
var agePercent = 0.08;
var medicalPercent = 0.02;
// 
var lostJobPercent = 0.005;
// 不超过36000元的部分，税率为3% ，
// 超过36000元至144000元的部分，税率为10%，
// 超过144000元至300000元的部分，税率为20% ，
// 超过300000元至420000元的部分，税率为25%，
// 超过420000元至660000元的部分 ，税率为30%，
// 超过660000元至960000元的部分，税率为35%，
// 超过960000元的部分，税率为45%。
function getMonthTax(salary) {
    var taxNumber = 0;
    if (salary <= 36000) {
        taxNumber = 0;
    }
    if (salary > 36000 && salary <= 144000) {
        taxNumber = taxNumber + (salary - taxNumber) * 0.1;
    }
    if (salary > 144000 && salary < 3000000) {
        taxNumber = taxNumber + (salary - taxNumber) * 0.2;
    }
    if (salary > 3000000 && salary < 4200000) {
        // return 0.25;
        taxNumber = taxNumber + (salary - taxNumber) * 0.25;
    }
    if (salary > 4200000 && salary < 6600000) {
        taxNumber = taxNumber + (salary - taxNumber) * 0.3;
        // return 0.3;
    }
    if (salary > 6600000 && salary < 9600000) {
        // return 0.35;
        taxNumber = taxNumber + (salary - taxNumber) * 0.35;
    }
    if (salary > 9600000) {
        taxNumber = taxNumber + (salary - taxNumber) * 0.45;
    }
    return taxNumber;
}
/**
 * 计算薪资的信息
 */
function calcSalary(input) {
    var salary = input.salary, fundsPercent = input.fundsPercent, taxNumber = input.taxNumber;
    // 计税的部分 = 税前工资 - 养老金 - 医疗保险 - 失业保险 - 公积金
    var calcNum = Math.min(salary, maxBase);
    var ageNumber = calcNum * agePercent;
    var medicalNumber = calcNum * medicalPercent;
    var lostJobNumber = calcNum * lostJobPercent;
    var fundsNumber = calcNum * fundsPercent;
    // 计税工资
    var taxSalary = salary - (ageNumber + medicalNumber + lostJobNumber + fundsNumber) - taxNumber;
    console.log('taxSalary', taxSalary);
    var trueSalary = getMonthTax(salary);
    console.log('trueSalary', trueSalary);
    // return {}
}
exports.calcSalary = calcSalary;
console.log(calcSalary({
    salary: 38000,
    hasSocial: true,
    socialNumber: 38000,
    hasFunds: true,
    fundsNumber: 38000,
    fundsPercent: 0.07,
    taxNumber: 3500,
    rewardNumber: 0
}));
console.log('getMonthTax(58145)', getMonthTax(58145));
