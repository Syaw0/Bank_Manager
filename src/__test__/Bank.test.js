const Bank = require("../Bank")

let mockUpdate = jest.spyOn(Bank.prototype , "updateDb" , 'set')



describe('Bank ', () => {
    
    it('Db initialing correctly' , ()=>{
        let obj = new Bank()
        expect(obj.customers).toBeInstanceOf(Array)
    })

    it("Db setter work correctly" , ()=>{
        let obj = new Bank()
        obj.updateDb = []
        expect(mockUpdate).toHaveBeenCalled()
        expect(obj.customers).toHaveLength(0)
    })

})