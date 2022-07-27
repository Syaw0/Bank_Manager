class BankGateway {
    constructor( originAccount , destinationAccount , inventory , amount , bank ){
        this.originAccount = originAccount
        this.destinationAccount = destinationAccount
        this.inventory = inventory
        this.amount = amount
        this.bank = bank
    }

    startTransfer(){
        if(this.terminalValidity()){
            let newBalance
        let newDb = this.bank.customers.map((customer)=>{
            if(customer.id === this.originAccount){
                newBalance = customer['balance'] - this.amount
                return {...customer , balance:newBalance }
            }else if(customer.id === this.destinationAccount){
                let newBalance = customer['balance'] + this.amount
                return {...customer , balance:newBalance}
            }else{
                return customer
            }
        })
        this.bank.updateDb = newDb  
        return {status:true , msg:`successfully transfer\nyour new balance is : ${newBalance}` , newBalance:newBalance}           
        
        }else{
            return {status:false , msg:"Your inputs Wrong please try again"}           
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
        return this.bank.customers.find((destination)=>destination['id'] === this.destinationAccount && destination['id'] !== this.originAccount && destination['type'] !== 'employer') || {status:false , reason:'destination is not correct'}
    }

    checkInventory(){
        return this.inventory > this.amount ? {status:true} : {status:false , reason:"Insufficient inventory"}
    }

}



module.exports = BankGateway