const BankGateway = require("./BankGateway")
class BankCustomer{

    constructor({name , fname , id , balance  , bank}){
        this.name = name
        this.fname = fname
        this.id = id
        this.balance = balance
        this.bank = bank
    }

    get amount(){
        return `\nyour amount is : ${this.balance}$`
    }


    updateBalance(newBalance){
        this.balance = newBalance
    }
    

    transfer(destination , amount ){
    
        const bankGateway = new BankGateway(this.id , destination , this.balance , amount , this.bank)
        let message = bankGateway.startTransfer()
        if(message['status']){
            this.updateBalance(message['newBalance'])
            
        }
        return message
    }

}



module.exports = BankCustomer