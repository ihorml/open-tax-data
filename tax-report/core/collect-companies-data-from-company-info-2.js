import XmlStream from 'xml-stream';
import {parseString} from 'xml2js';
import parser from 'fast-xml-parser';
import fs        from "fs";
import encoding        from "encoding";

export default () => {
  
  const PATH = __dirname + '/../data/companies.xml';
  
  // const RECORDS_IDS = JSON.parse(fs.readFileSync(__dirname + '/../aggregated/companies-codes.json'));
  
  const stream = fs.createReadStream(PATH, {
    // encoding  : 'windows-1251',
    fd        : null,
    bufferSize: 1,
  });
  
  let i = 0;
  
  const start = new Date().getTime();
  
  stream.on('readable', function () {
    let data;
    while (data = this.read()) {
      const myRegexp = /<SUBJECT>(.*?)<\/SUBJECT>/g;
      let match = myRegexp.exec(data);
      while (match != null) {
  
        // console.log(match[0]);
  
        const jsonObj = parser.parse(match[0]);
        
        console.log(jsonObj);
        
        // parseString(encoding.convert(match[0], 'windows-1251', 'utf-8').toString(), (err, result) => {
        //
        //   i++;
        //
        //   const name = result.SUBJECT.NAME[0];
        //
        //   if(i % 1000 === 0) {
        //     const current = new Date().getTime();
        //     console.log(`${i} It took: ` + Math.round((current-start)/1000) + ' s.');
        //   }
        //
        //   // console.log(JSON.stringify(result, null, 2));
        // });
        
      }
    }
  });
  
};
