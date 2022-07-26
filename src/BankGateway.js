const Bank = require("./Bank")


class BankGateway extends Bank {
    constructor( originAccount , destinationAccount , inventory , amount ){
        super()
        this.originAccount = originAccount
        this.destinationAccount = destinationAccount
        this.inventory = inventory
        this.amount = amount
    }

    startTransfer(){
        if(this.terminalValidity()){
        let newDb = this.customers.map((customer)=>{
            if(customer.id === this.originAccount){
                let newBalance = customer['balance'] - this.amount
                return {...customer , balance:newBalance }
            }else if(customer.id === this.destinationAccount){
                let newBalance = customer['balance'] + this.amount
                return {...customer , balance:newBalance}
            }else{
                return customer
            }
        })
        this.updateDb = newDb   
        return 'successfully transfer'             
        
        }else{
            return 'your inputs wrong please try again'
        }
    }

    terminalValidity(){
        const destinationCheck =  this.checkDestinationValidity()
        const inventoryCheck = this.checkInventory()
        if(destinationCheck['status'] === false || inventoryCheck['status'] === false){
            return false //not pass 
        }else{
            return true //pass
        }
    }

    checkDestinationValidity(){
        return this.customers.find((destination)=>destination['id'] === this.destinationAccount) || {status:false , reason:'destination is not correct'}
    }

    checkInventory(){
        return this.inventory > this.amount ? {status:true} : {status:false , reason:"Insufficient inventory"}
    }

}



module.exports = BankGateway