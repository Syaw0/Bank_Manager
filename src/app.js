const prompt = require("prompt-sync")({sigint:true})

const Bank = require("./Bank")
const BankCustomer = require("./BankCustomer")
const BankAuthentication = require("./BankAuthentication")
const BankEmployer = require("./BankEmployer")
const BankGateway = require("./BankGateway")


let currentUser
console.clear()
console.log("\n\nwelcome to our online bank\nbank in initialing...")
const bank = new Bank()











const stage2_1 = () =>{
    console.clear()
    console.log("\n\nchoose one :\n1.retry again\n2.back to main page\n")
    const answer = prompt("your answer : ")
    if(answer == 1 ){
        stage2()
    }else if(answer == 2){
        stage1()
    }else{
        stage2_1()
    }
}

const stage2_2 = () =>{
    console.clear()
    console.log("\nCustomer dashboard\n")
    console.log('choose one : \n1.show balance\n2.transfer\n0.log out\n')
    const answer = prompt('your answer : ')

    if(answer == 1){
        console.log(currentUser.amount)
        setTimeout(stage2_2 , 2000)
    }else if(answer == 2){
        console.log("\n\nTransfer Section\n")
        console.log('please answer question correctly')
        console.log("\nenter your amount to transfer ")
        const amount = prompt("your answer :   ")
        console.log("\nenter your destination id ")
        const destination = prompt("your answer :  ")
        let result = currentUser.transfer(destination , amount)
        console.log("\ntransferring...")
        setTimeout(()=>{console.log(result['msg'])},1000)
        setTimeout(()=>{stage2_2()}, 3000)
    }else if(answer == 0){
        console.clear()
        stage1()
    }else{
        console.log("\nwrong answer please try again")
        stage2_2()
    }


}


const stage2 = () =>{
    console.clear()
    console.log('\nLogin Stage\nPlease answer these question \n')
    console.log("\nwhat is your id?\n")
    const id = prompt("answer : ")

    console.log("\nwhat is your password?\n")
    const password = prompt("answer : ")

    console.log("\nprocessing...")
    setTimeout(()=>{
    let authentication = new BankAuthentication(id , password , "customer" , bank)
    let result = authentication.Authentication()    
    
    if(!result['status'] && result['status'] !== undefined){
        console.clear()
        console.log(result['msg'])
        setTimeout(stage2_1 , 3000)
    }else {
        console.log("\nsuccessfully login\n")
        setTimeout(()=>{
        currentUser = new BankCustomer({...result , bank})
        stage2_2(result)
        },1000)
    }
    },2000)
}




const stage3_1 = () =>{
    console.clear()
    console.log("\n\nchoose one :\n1.retry again\n2.back to main page\n")
    const answer = prompt("your answer : ")
    if(answer == 1 ){
        stage3()
    }else if(answer == 2){
        stage1()
    }else{
        stage3_1()
    }
}


const stage3_2 = () =>{
    console.clear()
    console.log("\nEmployer dashboard\n")
    console.log('choose one : \n1.Create New Account\n2.Update Account Information\n3.Delete Account\n4.Limit Account\n5.Remove Limit\n6.Show All Customers\n')
    const answer = prompt('your answer : ')

    if(answer == 1){
        console.clear()
        console.log('\nCreating Account\n')
        console.log('\nname of account?')
        const name = prompt('your answer :  ')
        console.log('\nFamily name of account?')
        const fname = prompt('your answer : ')
        console.log('\npassword of account?')
        const password = prompt('your answer : ')
        console.log('\nid of account?')
        const id = prompt('your answer : ')
        console.log('\ninitBalance of account?')
        const initBalance = prompt('your answer : ')

        let result = currentUser.create(name , fname , password , id , initBalance)

        if(result['status']){
            console.log(result['msg'])
            setTimeout(stage3_2 , 2000)
        }else{
            console.clear()
            console.log(result['msg'])
            setTimeout(stage3_2 , 2000)
        }


    }else if(answer == 2){
        console.clear()
        console.log('\nid of account?')
        const id = prompt('your answer : ')
        console.log('\nname of account?')
        const name = prompt('your answer : ')
        console.log('\nFamily name of account?')
        const fname = prompt('your answer : ')
        console.log('\npassword of account?')
        const password = prompt('your answer : ')

        let result = currentUser.update(id,{name , fname , password })

        if(result['status']){
            console.log(result['msg'])
            setTimeout(stage3_2 , 1000)
        }else{
            console.clear()
            console.log(result['msg'])
            setTimeout(stage3_2 , 2000)
        }

    }else if(answer == 3){
        console.clear()
        
        console.log('\nid of account?')        
        const id = prompt('your answer : ')

        let result = currentUser.delete(id)

        console.clear()
        console.log(result['msg'])
        setTimeout(stage3_2 , 2000)




    }else if(answer == 4){
        console.clear()

        console.clear()
        console.log('\nid of account?')        
        const id = prompt('your answer : ')

        let result = currentUser.limit(id)

        console.clear()
        console.log(result['msg'])
        setTimeout(stage3_2 , 2000)

    }else if( answer == 5){
        console.clear()
        console.clear()
        console.log('\nid of account?')        
        const id = prompt('your answer : ')

        let result = currentUser.removeLimit(id)

        console.clear()
        console.log(result['msg'])
        setTimeout(stage3_2 , 2000)

    }else if(answer == 6 ){
        console.clear()
        console.clear()
        let db = currentUser.showDb()
        console.log('name , fname , id , balance , type\n')
        for(let i = 0 ; i!= db.length ; i++){
            console.log(`${db[i]['name']} , ${db[i]['fname']} , ${db[i]['id']} , ${db[i]['balance']} , ${db[i]['type']}\n`)
        }

        setTimeout(stage3_2 , 5000)
    }else{
        console.clear()
        console.log('wrong answer please try again')
        setTimeout(stage3_2 , 2000)
    }


}



const stage3 = () =>{
    console.clear()
    console.log('\nLogin Stage\nPlease answer these question \n')
    console.log("\nwhat is your id?")
    const id = prompt("answer : ")

    console.log("\nwhat is your password?")
    const password = prompt("answer : ")

    console.log("processing...")
    let authentication = new BankAuthentication(id , password , "employer" , bank)
    let result = authentication.Authentication()    
    
    if(!result['status'] && result['status'] !== undefined){
        console.clear()
        console.log(result['msg'])
        setTimeout(stage3_1 , 3000)
    }else {
        setTimeout(()=>{console.log('\nsuccessfully login\n')},1000)
        currentUser = new BankEmployer({...result , bank})
        setTimeout(()=>{stage3_2(result)},3000)
    }
}


const stage1 = ()=>{
    console.clear()
    let text = "1.login as customer\n2.login as employer\n"
    console.log("\nchoose one \n ")
    console.log(text)
    const answer = prompt('your answer :')
    console.log(answer)
    if(answer == 1){
        stage2()
    }else if(answer == 2){
        stage3()
    }else{
        console.clear()
        console.log('\n wrong answer please try again\n')
        setTimeout(()=>{console.clear() ; stage1()},2000)
  
    }    
}    

setTimeout(stage1 , 1000)




// const bank = new Bank()

// let employer = new BankEmployer("siavash" , 'mhb' , '#gf11' , bank)


// employer.create('mahdi' , 'mhb' , 'hash#224' , "#op33" , 20 )
// employer.limit("#op33")
// employer.update("#op33" , {name:'asghr'})

// employer.delete("#op33")
// console.log(bank.customers)



