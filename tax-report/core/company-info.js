import XmlStream from 'xml-stream';
import fs        from "fs";

export default () => {
  
  const path = __dirname + '/../data/companies.xml';
  
  const a = new XmlStream(fs.createReadStream(path));
  
  a.collect('FOUNDER');
  a.collect('BENEFICIARY');
  a.collect('ACTIVITY_KIND');
  a.collect('BRANCH');
  a.on('endElement: SUBJECT', (data) => {
    const company = data;
    
    if(company.NAME.indexOf('ЕПАМ') === -1)
      return;
    
    
    console.log('END data:', JSON.stringify(data, null, 2));
  });
  
  
};
