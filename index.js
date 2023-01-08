
require('dotenv').config();
const { getDB, getStartBlock } = require("./db");
const { startApi } = require("./api");
const DB = getDB(); //initalize databases
const historyProvider = process.env.HISTORY_PROVIDER || 'firehose';

async function main(){

  const startBlock = await getStartBlock();
  console.log("startBlock",startBlock)
  if (historyProvider === 'firehose'){
    const {  streamFirehose } = require('./firehose');
    await streamFirehose(startBlock);  
  }
  else if (historyProvider === 'ship'){
    const SHIP = require('./ship');
    const ship = new SHIP();
    ship.start(process.env.SHIP_WS);
  }
  await startApi();

  console.log("READY")

}

var signals = {
  'SIGHUP': 1,
  'SIGINT': 2,
  'SIGTERM': 15
};
Object.keys(signals).forEach((signal) => {
  process.on(signal, () => {
    console.log(`process received a ${signal} signal`);
    let value = signals[signal];
    process.exit(128 + value);
  });
});

main().then().catch(ex=>{
  console.log("Main error",ex);
});



