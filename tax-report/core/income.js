import fs from 'fs';
const csv = require('csv-parser')
const data = [];

export default () => {
  
  const PATH = __dirname + '/../data/J0900207_Zvit_finrez_forma_2.csv';
  
  const getItem = (a) => {
    
    return (key) => {
      const keys = Object.keys(a)[0];
      const value = a[keys].split(';');
      
      const indexOf = keys.split(';').indexOf(key);
      
      return value[indexOf];
    };
    
  };
  
  const FULL_NAME = 'FULL_NAME';
  const CLEAR_INCOME_FROM_REALIZATION_PRODUCTS = 'R2000G3';
  const CLEAR_INCOME_FROM_REALIZATION_PRODUCTS_PREV_PRERIOD = 'R2000G4';
  const SELF_PRICE = 'R2350G3';
  
  const companies = [];
  
  fs.createReadStream(PATH)
    .pipe(csv())
    .on('data', function (a, b) {
      const getData = getItem(a);
    
      const name = getData(FULL_NAME);
      const income = getData(CLEAR_INCOME_FROM_REALIZATION_PRODUCTS);
      const incomePrev = getData(CLEAR_INCOME_FROM_REALIZATION_PRODUCTS_PREV_PRERIOD);
      const price = getData(SELF_PRICE);
    
      // if(name.indexOf("ЕПАМ") === -1) {
      //   return;
      // }
    
      companies.push({
        name: name,
        income: Number(income),
        incomePrev: Number(incomePrev),
        price: Number(price),
      });
    
    })
    .on('end', function () {
    
      const sortedByIncomeCompanies = companies.sort((a, b) => b.income - a.income).map((company) => (Object.assign(company, {
        income: Number(company.income*1000).toLocaleString(),
        incomePrev: Number(company.incomePrev*1000).toLocaleString(),
        price: Number(company.price*1000).toLocaleString(),
      })));
    
      for(let i = 0; i < 10; i++) {
        console.log(
          sortedByIncomeCompanies[i]
        );
      }
    });
  
}
