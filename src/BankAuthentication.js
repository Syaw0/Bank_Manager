const Bank = require("./Bank")

class BankAuthentication extends Bank{

    constructor(id , password , type){
        super()
        this.id = id
        this.password = password 
        this.type = type
    }

    Authentication(){
        return this.customers.find((customer)=>customer["id"] === this.id && customer["password"] === this.password) || false
    }   
}



module.exports = BankAuthentication
