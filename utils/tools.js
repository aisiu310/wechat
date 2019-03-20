const { parseString } = require('xml2js');

module.exports={
  getUserDataAsync (req){
    return new Promise((resolve, reject) => {
        let xmlData = '';
        req
            .on('data', data => {
                xmlData += data.toString();
                // console.log(data.toString())
            })
            .on('end', () => {
                resolve(xmlData);
            })
    })

  },
  parseXMLData (xmlData){
    let jsData = null;

    parseString(xmlData, { trim: true }, (err, result) => {
        if (!err) {
            jsData = result;
        } else {
            jsData = {};
        }
    })
    return jsData;
  },
  formatJsData(jsData){
    const { xml } = jsData;
    let userData = {};
    for (let key in xml) {
        const value = xml[key];
        userData[key] = value[0];
        
    }
    return userData;
  }
}