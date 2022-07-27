const Bank = require("../Bank")
const BankGateway = require("../BankGateway")
const fakeCustomer = require("../fakeCustomers")

let mockedStartTransfer = jest.spyOn(BankGateway.prototype , "startTransfer")
let mockedTerminalValidity = jest.spyOn(BankGateway.prototype , "terminalValidity")
let mockedCheckDestination = jest.spyOn(BankGateway.prototype , "checkDestinationValidity")
let mockedCheckAmount = jest.spyOn(BankGateway.prototype , "checkInventory")




describe('Bank GateWay Checking Destination validity', () => {

    it("check Destination for sending with correct data return a destination" , ()=>{
        let bank = new Bank()
        let gateWay = new BankGateway(fakeCustomer[0]['id'] , fakeCustomer[1]['id'] , fakeCustomer[0]['balance'] , 23 , bank)
        let res = gateWay.checkDestinationValidity()
        expect(mockedCheckDestination).toHaveBeenCalledTimes(1)
        expect(res).toBeTruthy()
        expect(res).toBeInstanceOf(Object)
    })


    it("check Destination for sending with wrong data return a destination (must not himself)" , ()=>{
        let bank = new Bank()
        let gateWay = new BankGateway(fakeCustomer[0]['id'] , fakeCustomer[0]['id'] , fakeCustomer[0]['balance'] , 23 , bank)
        let res = gateWay.checkDestinationValidity()
        expect(mockedCheckDestination).toHaveBeenCalledTimes(1)
        expect(res['status']).toBeFalsy()
    })

    it("check Destination for sending with correct data return a destination (must not be a employer)" , ()=>{
        let bank = new Bank()
        let gateWay = new BankGateway(fakeCustomer[0]['id'] , fakeCustomer[3]['id'] , fakeCustomer[0]['balance'] , 23 , bank)
        let res = gateWay.checkDestinationValidity()
        expect(mockedCheckDestination).toHaveBeenCalledTimes(1)
        expect(res['status']).toBeFalsy()

    })


})

describe('Bank Gateway checking inventory', () => {

    it("data is correct (amount > send)" , ()=>{
        let bank = new Bank()
        let gateWay = new BankGateway(fakeCustomer[0]['id'] , fakeCustomer[1]['id'] , fakeCustomer[0]['balance'] , 23 , bank)
        let res = gateWay.checkInventory()
        expect(mockedCheckAmount).toHaveBeenCalledTimes(1)
        expect(res['status']).toBeTruthy()
        expect(res).toBeInstanceOf(Object)
        
    })

    it("data is not correct (amount < send)" , ()=>{
        let bank = new Bank()
        let gateWay = new BankGateway(fakeCustomer[0]['id'] , fakeCustomer[1]['id'] , fakeCustomer[0]['balance'] , 200 , bank)
        let res = gateWay.checkInventory()
        expect(mockedCheckAmount).toHaveBeenCalledTimes(1)
        expect(res['status']).toBeFalsy()
    })

 
})


describe('Bank Gateway Check TerminalValidity', () => {

    it("inventory and destination both correct" , ()=>{
        let bank = new Bank()
        let gateWay = new BankGateway(fakeCustomer[0]['id'] , fakeCustomer[1]['id'] , fakeCustomer[0]['balance'] , 23 , bank)
        let res = gateWay.terminalValidity()
        expect(mockedTerminalValidity).toHaveBeenCalledTimes(1)
        expect(res).toBeTruthy()
    })

    it("inventory is not correct " , ()=>{
        let bank = new Bank()
        let gateWay = new BankGateway(fakeCustomer[0]['id'] , fakeCustomer[1]['id'] , fakeCustomer[0]['balance'] , 3333 , bank)
        let res = gateWay.terminalValidity()
        expect(mockedTerminalValidity).toHaveBeenCalledTimes(1)
        expect(res).toBeFalsy()
    })



    it("destination is not correct" , ()=>{
        let bank = new Bank()
        let gateWay = new BankGateway(fakeCustomer[0]['id'] , fakeCustomer[0]['id'] , fakeCustomer[0]['balance'] , 23 , bank)
        let res = gateWay.terminalValidity()
        expect(mockedTerminalValidity).toHaveBeenCalledTimes(1)
        expect(res).toBeFalsy()
    })

})


describe('Start Transfer', () => { 

    it('terminal validity return false' , ()=>{
        let bank = new Bank()
        let gateWay = new BankGateway(fakeCustomer[0]['id'] , fakeCustomer[0]['id'] , fakeCustomer[0]['balance'] , 23 , bank)
        let res = gateWay.startTransfer()
        expect(mockedStartTransfer).toHaveBeenCalledTimes(1)
        expect(res['status']).toBeFalsy()
    })

    it('terminal validity return true' , ()=>{
        let bank = new Bank()
        let gateWay = new BankGateway(fakeCustomer[0]['id'] , fakeCustomer[1]['id'] , fakeCustomer[0]['balance'] , 23 , bank)
        let res = gateWay.startTransfer()
        expect(mockedStartTransfer).toHaveBeenCalledTimes(1)
        expect(res['status']).toBeTruthy()
    })


    it('when is correct new database set with bank.updateDb' , ()=>{
        let bank = new Bank()
        let mockedUpdate = jest.spyOn(bank , "updateDb" , 'set')
        let gateWay = new BankGateway(fakeCustomer[0]['id'] , fakeCustomer[1]['id'] , fakeCustomer[0]['balance'] , 23 , bank)
        gateWay.startTransfer()
        expect(mockedUpdate).toHaveBeenCalledTimes(1)
    })


    it('when is correct origin amount will decrease' , ()=>{
        let bank = new Bank()
        let mockedUpdate = jest.spyOn(bank , "updateDb" , 'set')
        let newAmount = fakeCustomer[0]['balance'] - 23
        let gateWay = new BankGateway(fakeCustomer[0]['id'] , fakeCustomer[1]['id'] , fakeCustomer[0]['balance'] , 23 , bank)
        gateWay.startTransfer()
        expect(bank.customers[0]['balance']).toEqual(newAmount)
        
    })

    it('when is correct destination amount will increase' , ()=>{
        let bank = new Bank()
        let mockedUpdate = jest.spyOn(bank , "updateDb" , 'set')
        let newAmount = fakeCustomer[1]['balance'] + 23
        let gateWay = new BankGateway(fakeCustomer[0]['id'] , fakeCustomer[1]['id'] , fakeCustomer[0]['balance'] , 23 , bank)
         gateWay.startTransfer()
        expect(bank.customers[1]['balance']).toEqual(newAmount)
        
    })


})