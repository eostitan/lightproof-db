# NOTE : This repository is no longer maintained. New repository is https://github.com/CryptoMechanics/lightproof-db

---

# lightproof-db

Lightproof-db for antelope stores the block id, number and active nodes for each block. It exposes the data through an http GET server.
Currently only firehose is supported for consuming blocks and extracting the data for the lmdb database tables.

## Instructions

#### Clone the repo and install dependencies
```
git clone https://github.com/eostitan/lightproof-db.git
cd lightproof-db
npm install
```


#### Configuration

- `cp .env.example .env`

- edit the `.env` file variables
```
PORT=8285                     #host port to use for http (consumed by ibc-proof-server)
GRPC_ADDRESS=localhost:9000    #GRPC address of firehose service (ideally on local network/machine)
GRPC_INSECURE=true             #set to true if connecting to insecure GRPC service vs TLS
FORCE_START_BLOCK=BLOCK_NUMBER  #force indexing to start from a certain block
```


#### Run
```
node index.js
```
