import fs from 'fs';
const csv = require('csv-parser')
const data = [];

export default () => {
  
  const PATH = __dirname + '/../data/J0900207_Zvit_finrez_forma_2.csv';
  const WRITE_PATH = __dirname + '/../aggregated/companies-codes.json';
  
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
  
  const companies = {};
  
  fs.createReadStream(PATH)
    .pipe(csv())
    .on('data', function (a, b) {
      const getData = getItem(a);
    
      const tin = getData(TIN);
      
      companies[tin] = 1;
    
    })
    .on('end', function () {
    
      const write = fs.createWriteStream(WRITE_PATH);
      
      write.write(JSON.stringify(companies));
      
    });
    
  
}
