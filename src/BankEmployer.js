const Bank = require("./Bank")

class BankEmployer {
    constructor(name , fname , id ){
        super()
        this.name = name
        this.fname = fname
        this.id = id
    }

    create(name , fname , password){
        console.log('created account')
    }

    update(id , {name , fname , balance , password}){
        console.log('updated')
    }

    limit(id){
        console.log("account limited")
    }

    delete(id){
        console.log('account deleted')
    }
}

module.exports = BankEmployer