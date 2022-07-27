const Bank = require("../Bank")
const BankCustomer = require("../BankCustomer")
const fakeCustomer = require('../fakeCustomers')

let mockedAmount = jest.spyOn(BankCustomer.prototype , 'amount' , 'get')
let mockedUpdateBalance = jest.spyOn(BankCustomer.prototype , 'updateBalance')
let mockedTransfer = jest.spyOn(BankCustomer.prototype , 'transfer')


describe('Bank Customer Functionality ', () => {

    it('Method amount return a balance ' , ()=>{
        let bank = new Bank()
        let customer = new BankCustomer({...fakeCustomer[0] , bank})
        let amount = customer.amount
        expect(mockedAmount).toBeCalledTimes(1)
        expect(amount).toContain(`${fakeCustomer[0]['balance']}`)
    })

    it("Method update Balance updated object balance" , ()=>{
        let bank = new Bank()
        let customer = new BankCustomer({...fakeCustomer[0] , bank})
        let newAmount = 300
        customer.updateBalance(newAmount)
        expect(mockedUpdateBalance).toHaveBeenCalledTimes(1)
        expect(customer.balance).toEqual(newAmount)
    })

    it("Transfer money with correct data (destination exist and amount > sending money )"  , ()=>{
        let bank = new Bank()
        let customer = new BankCustomer({...fakeCustomer[0] , bank})
        let result = customer.transfer(fakeCustomer[1]['id'] , 20)
        expect(mockedTransfer).toHaveBeenCalledTimes(1)
        expect(result['status']).toBeTruthy()        
    })

    it("Transfer money with correct data and origin amount will decrease ! )"  , ()=>{
        let bank = new Bank()
        let customer = new BankCustomer({...fakeCustomer[0] , bank})
        let preAmount = fakeCustomer[0]['balance']
        let amount = 30
        let newAmount = preAmount - amount
        customer.transfer(fakeCustomer[1]['id'] , amount)
        expect(mockedTransfer).toHaveBeenCalledTimes(1)
        expect(mockedUpdateBalance).toHaveBeenCalledTimes(1)
        expect(customer.balance).toEqual(newAmount)

    })

    it("Transfer money with wrong data (user is not exist)"  , ()=>{
        let bank = new Bank()
        let customer = new BankCustomer({...fakeCustomer[0] , bank})
        let result = customer.transfer("bela bela" , 20)
        expect(mockedTransfer).toHaveBeenCalledTimes(1)
        expect(result['status']).toBeFalsy()        
    })


    it("Transfer money with wrong data (amount < sending money)"  , ()=>{
        let bank = new Bank()
        let customer = new BankCustomer({...fakeCustomer[0] , bank})
        let result = customer.transfer(fakeCustomer[1]['id'] , 30000)
        expect(mockedTransfer).toHaveBeenCalledTimes(1)
        expect(result['status']).toBeFalsy()        
    })

})