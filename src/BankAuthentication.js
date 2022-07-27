class BankAuthentication {

    constructor(id , password , type , bank ){
        this.id = id
        this.password = password 
        this.type = type
        this.bank = bank   
    }

    Authentication(){
        let result = this.bank.customers.find((customer)=> customer["id"] === this.id  && customer['password'] === this.password && customer['type'] === this.type)  || false
        if(result){
            
           return result['limited'] ?  {status:false , msg:'authentication failed , your account limited'} : result
        }else{
            return {status:false , msg:'\nauthentication failed please try again i think you enter the wrong id or password'}
        }
        
    }   

}



module.exports = BankAuthentication
