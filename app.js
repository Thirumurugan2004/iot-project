const { SerialPort } = require('serialport');
const cors = require('cors');
const express = require('express')
const app = express()
app.use(cors())
const port1 = 5000

var result;


app.get('/result', (req, res) => {
    res.json(result)
  })
  
  app.listen(port1, () => {
    console.log(`Example app listening on port ${port1}`)
  })

const config = {
    path: 'COM6',
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    autoOpen: true
};

const port = new SerialPort(config);
port.open((err) => {
    if(err){
        console.log("Error opening the port: "+err.message);
    }
});

port.on('data', (data) => {
    const textData = data.toString();
    console.log(textData);
    const splitData = textData.split(':');
    const obj = {
        
        moist: splitData[0],
        tempC: splitData[1],
        avgN: splitData[2],
        avgP: splitData[3],
        avgK:splitData[4],
        temperature:splitData[5],
        humidity:splitData[6]
    }
    result = obj;
    console.log(result);
});





