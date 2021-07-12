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
  const TIN = 'TIN';
  const INCOME = 'R2000G3';
  const REVENUE = 'R2350G3';
  const LOSS = 'R2195G3';
  const A1 = 'R2190G3';
  const A2 = 'R2515G3';
  
  const companies = [];
  
  fs.createReadStream(PATH)
    .pipe(csv())
    .on('data', function (a, b) {
      const getData = getItem(a);
    
      const tin = getData(TIN);
      const name = getData(FULL_NAME);
      const income = getData(INCOME);
      const revenue = getData(REVENUE);
      const loss = getData(LOSS);
      const a1 =  getData(A1);
      const a2 =  getData(A2);
    
      // if(name.toUpperCase().indexOf("ЛАЙФСЕЛЛ") === -1) {
      //   return;
      // }
  
      function getAllIndexes(arr, val) {
        let indexes = [], i = -1;
        while ((i = arr.indexOf(val, i+1)) != -1){
          indexes.push(i);
        }
        return indexes;
      }
      
      // console.log(getAllIndexes(a[Object.keys(a)[0]].split(';'), '942110'))
      // console.log(Object.keys(a)[0].split(';')[81])
      // console.log(Object.keys(a)[0].split(';')[101])
      
      companies.push({
        tin: tin,
        name: name,
        income: Number(income),
        loss: Number(loss),
        revenue: Number(revenue),
        ebitda: Number(a1) + Number(a2),
      });
    
    })
    .on('end', function () {
    
      const sortedByIncomeCompanies = companies.sort((a, b) => b.ebitda - a.ebitda).map((company) => (Object.assign(company, {
        loss: Number(company.loss*1000).toLocaleString(),
        income: Number(company.income*1000).toLocaleString(),
        revenue: Number(company.revenue*1000).toLocaleString(),
        ebitda: Number(company.ebitda*1000).toLocaleString(),
      })));
    
      for(let i = 0; i < 50; i++) {
        console.log(
          sortedByIncomeCompanies[i]
        );
      }
    });
  
}
