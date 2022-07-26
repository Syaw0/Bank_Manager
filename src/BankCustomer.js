const Bank = require("./Bank")
const BankGateway = require("./BankGateway")
const fakeCustomers = require("./fakeCustomers")

class BankCustomer extends Bank{

    constructor({name , fname , id , balance }){
        super()
        this.name = name
        this.fname = fname
        this.id = id
        this.balance = balance
    }


    get Balance(){
        return this.Balance
    }



    transfer(destination , amount ){
        const bankGateway = new BankGateway(this.id , destination , this.balance , amount)
        let message = bankGateway.startTransfer()
        console.log(message)
    }

}



module.exports = BankCustomer