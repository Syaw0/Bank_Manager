const Bank = require("./Bank")

class BankEmployer {
    constructor({name , fname , id , bank}){
        this.name = name
        this.fname = fname
        this.id = id
        this.bank = bank
    }

    create(name , fname , password , id , initBalance ){
        if(!this.find(id)){
        let newCustomer = {name:name , fname:fname , id:id , balance:initBalance , type:'customer' , password:password , limited:false}
        this.bank.updateDb = [...this.bank.customers , {...newCustomer}]
        return {status :true , msg:"\nsuccessfully created "}
        }else{
            return {status :false , msg:'id exist try another'}
        }
    }

    update(id , newData){
        let result = this.insertData(id , newData)
        return result
    }

    limit(id){
        return this.insertData(id , {limited:true})
        
    }

    removeLimit(id){
        return this.insertData(id , {limited:false})
        
    }

    delete(id){
        let result = this.filterData(id)
        return result
        
    }

    find(id){
        let result = this.bank.customers.find((customer) => customer['id'] === id && customer['id'] !== this.id ) || false
        return result
    }

    showDb(){
        return this.bank.customers
    }



    filterData(id){
        let findResult = this.find(id)
        if(findResult){
            let newDb = this.bank.customers.filter( (customer) =>{
                return customer['id'] !== findResult['id']
            })

            this.bank.updateDb = newDb
            return {status:true , msg:"successfully deleted"}
        }else{
            return {status:false  , msg:"id is not correct"}
        }
    }


    insertData(id , data){
        let findResult = this.find(id)
        if(findResult){
            let newDb = this.bank.customers.map( (customer) => {
                if( customer['id'] === findResult['id'] ){
                    return {...findResult , ...data}
                }else{
                    return customer
                }
            })
            this.bank.updateDb = newDb
            return {status:true , msg:"account updated successfully"}
        }else{
            return {status:false , msg:"id not found"}
        }

    }
}

module.exports = BankEmployer