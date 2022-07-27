const Bank = require('../Bank')
const BankAuthentication = require("../BankAuthentication")

let mockAuth = jest.spyOn(BankAuthentication.prototype , 'Authentication')


describe('Authentication...', () => {

    it('authentication with correct data return person data' , ()=>{
        let bank = new Bank()
        let authentication = new BankAuthentication('1' , "1" , 'customer' , bank)
        let res = authentication.Authentication()
        expect(mockAuth).toHaveBeenCalled()
        expect(res['id']).toEqual('1')
    })

    
    it('authentication with Data that person account limited' , ()=>{
        let bank = new Bank()
        let authentication = new BankAuthentication('2' , "2" , 'customer' , bank)
        let res = authentication.Authentication()
        expect(mockAuth).toHaveBeenCalled()
        expect(res['status']).toBeFalsy()
    })


    it('authentication with Wrong Data' , ()=>{
        let bank = new Bank()
        let authentication = new BankAuthentication('2' , "1" , 'customer' , bank)
        let res = authentication.Authentication()
        expect(mockAuth).toHaveBeenCalled()
        expect(res['status']).toBeFalsy()
    })


    it('authentication with Wrong Type of user' , ()=>{
        let bank = new Bank()
        let authentication = new BankAuthentication('2' , "1" , 'employer' , bank)
        let res = authentication.Authentication()
        expect(mockAuth).toHaveBeenCalled()
        expect(res['status']).toBeFalsy()
    })



})