import XmlStream from 'xml-stream';
import fs        from "fs";

export default () => {
  
  const path = __dirname + '/../data/companies.xml';
  
  const RECORDS_IDS = JSON.parse(fs.readFileSync(__dirname + '/../aggregated/companies-codes.json'));
  
  const companies = [];
  
  const a = new XmlStream(fs.createReadStream(path));
  
  let i = 0;
  let found = 0;
  let start = new Date().getTime();
  
  // a.collect('FOUNDER');
  // a.collect('BENEFICIARY');
  // a.collect('ACTIVITY_KIND');
  // a.collect('BRANCH');
  a.on('endElement: SUBJECT', (data) => {
    i++;
    // const company = data;
    // const record = company.RECORD;
    //
    // if(!RECORDS_IDS[record])
    //   return;
    
    found++;
    
    // console.log('END data:', JSON.stringify(data, null, 2));
    if(found % 1000 === 0) {
      const current = new Date().getTime()
      console.log(`${i}/${found}. It took: ` + Math.round((current-start)/1000) + ' s.');
    }
  });
  
  a.on('end', () => {
    console.log('NED!');
  });
  
  
};
