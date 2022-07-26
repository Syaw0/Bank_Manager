const fakeCustomer = require("./fakeCustomers")


class Bank {
    constructor(){
        //query to db
        this.customers = [...fakeCustomer]
    }

    set updateDb(newDb){
        this.customers = []
        this.customers = [...newDb]
    }
}

module.exports = Bank