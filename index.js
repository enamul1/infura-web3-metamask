async function sendTransaction() {
    var Web3 = require('web3')
    var EthereumTransaction = require("ethereumjs-tx").Transaction
    var url = 'https://rinkeby.infura.io/v3/5d77ffa0ed0d49f4a751dc979521ae93' // 8545 if using ganache-cli
    var web3 = new Web3(url)
    
    var sendingAddress  = ''// here metamask account address 1
    var receivingAddress = '' //// here metamask account address 2
    
    
    await web3.eth.getBalance(sendingAddress).then(console.log) 
    await web3.eth.getBalance(receivingAddress).then(console.log)
   
    var nonce = await web3.eth.getTransactionCount(sendingAddress, 'pending');
    var rawTransaction = { nonce: nonce, to: receivingAddress, gasPrice: 20000000, gasLimit: 30000, value: 100000, data: "0x" }
    
    await web3.eth.getBalance(sendingAddress).then(console.log) 
   
    await web3.eth.getBalance(receivingAddress).then(console.log)
   
    var privateKeySender = '' //sender private key
    var privateKeySenderHex = await new Buffer.from(privateKeySender, "hex")
    
    var transaction =  await new EthereumTransaction(rawTransaction)
    
    await transaction.sign(privateKeySenderHex)
    
    var serializedTransaction = await transaction.serialize();
    await web3.eth.sendSignedTransaction(serializedTransaction).catch(err => {
        console.log(err)
    })
}
sendTransaction()