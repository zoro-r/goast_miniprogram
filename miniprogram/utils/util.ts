
interface SalaryInput {
  // 月薪
  salary: number;
  // 是否有社保
  hasSocial: boolean;
  // 社保基数
  socialNumber: number;
  // 公积金 是否有公积金
  hasFunds: boolean;
  // 公积金基数
  fundsNumber: number;
  // 公积金比例
  fundsPercent: number;
  // 抵税金额
  taxNumber: number;
  // 奖金
  rewardNumber: number;
}

interface Income {
  month: number; // 月份
  salary: number; // 薪资
  tax: number; // 个税
  fund: number; // 公积金
  aged: number; // 养老
  medical: number; // 医疗
}

interface SalaryOutput {
  // 到手总金额
  incomeCount: number;
  // 薪水金额
  salaryCount: number;
  // 奖金金额
  rewardCount: number;
  // 总交税
  taxNumber: number;
  incomeList: Income[];
  // 公积金
  fundNumber: number;
  agedNumber: number;
  medicalNumber: number;
}

const maxBase = 34188;
const agePercent = 0.08;
const medicalPercent = 0.02;

// 
const lostJobPercent = 0.005;

// 不超过36000元的部分，税率为3% ，
// 超过36000元至144000元的部分，税率为10%，
// 超过144000元至300000元的部分，税率为20% ，
// 超过300000元至420000元的部分，税率为25%，
// 超过420000元至660000元的部分 ，税率为30%，
// 超过660000元至960000元的部分，税率为35%，
// 超过960000元的部分，税率为45%。

function getMonthTax(salary: number) {
  let taxNumber = 0;
  if (salary <= 36000) {
    taxNumber = 0;
  }
  if (salary > 36000 && salary <= 144000) {
    taxNumber = taxNumber + (salary - taxNumber) * 0.1;
  }
  if (salary > 144000 && salary < 3000000) {
    taxNumber = taxNumber + (salary - taxNumber) * 0.2;
  }
  if (salary > 3000000 &&salary < 4200000) {
    // return 0.25;
    taxNumber = taxNumber + (salary - taxNumber) * 0.25;
  }
  if (salary > 4200000 &&salary < 6600000) {
    taxNumber = taxNumber + (salary - taxNumber) * 0.3;
    // return 0.3;
  }
  if (salary > 6600000 &&salary < 9600000) {
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
export function calcSalary(input: SalaryInput) {
  const { salary, fundsPercent, taxNumber } = input;

  // 计税的部分 = 税前工资 - 养老金 - 医疗保险 - 失业保险 - 公积金
  const calcNum = Math.min(salary, maxBase);
  const ageNumber = calcNum * agePercent;
  const medicalNumber = calcNum * medicalPercent;
  const lostJobNumber = calcNum * lostJobPercent;
  const fundsNumber = calcNum * fundsPercent;

  // 计税工资
  const taxSalary = salary - (ageNumber + medicalNumber + lostJobNumber + fundsNumber) - taxNumber;

  console.log('taxSalary', taxSalary);

  const trueSalary = getMonthTax(salary);

  console.log('trueSalary', trueSalary);

  // return {}
}


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