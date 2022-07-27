const Bank = require("../Bank");
const BankEmployer = require("../BankEmployer");
const fakeCustomer = require("../fakeCustomers");

let mockInsertData = jest.spyOn(BankEmployer.prototype, "insertData");
let mockFilterData = jest.spyOn(BankEmployer.prototype, "filterData");
let mockFind = jest.spyOn(BankEmployer.prototype, "find");
let mockShowDb = jest.spyOn(BankEmployer.prototype, "showDb");
let mockDelete = jest.spyOn(BankEmployer.prototype, "delete");
let mockLimit = jest.spyOn(BankEmployer.prototype, "limit");
let mockRemoveLimit = jest.spyOn(BankEmployer.prototype, "removeLimit");
let mockUpdate = jest.spyOn(BankEmployer.prototype, "update");
let mockCreate = jest.spyOn(BankEmployer.prototype, "create");

describe("Bank Employer", () => {
  describe("Insert Method", () => {
    it("insertMethod with correct id", () => {
      let bank = new Bank();
      let employer = new BankEmployer({ ...fakeCustomer[3], bank });
      let res = employer.insertData(fakeCustomer[0]["id"], { bela: "foo" });
      expect(mockInsertData).toHaveBeenCalledTimes(1);
      expect(bank.customers[0]["bela"]).toEqual("foo");
      expect(res["status"]).toBeTruthy();
    });

    it("insertMethod with incorrect id", () => {
      let bank = new Bank();
      let employer = new BankEmployer({ ...fakeCustomer[3], bank });
      let res = employer.insertData("bela bela", { bela: "foo" });
      expect(mockInsertData).toHaveBeenCalledTimes(1);
      expect(res["status"]).toBeFalsy();
    });
  });

  describe("Filter Method", () => {
    it("FilterMethod with correct id will delete a accounts", () => {
      let bank = new Bank();
      let employer = new BankEmployer({ ...fakeCustomer[3], bank });
      let preArrList = bank.customers.length;
      let res = employer.filterData(fakeCustomer[0]["id"]);
      expect(mockFilterData).toHaveBeenCalledTimes(1);
      expect(bank.customers.length).toEqual(preArrList - 1);
      expect(res["status"]).toBeTruthy();
    });

    it("FilterMethod with incorrect", () => {
      let bank = new Bank();
      let employer = new BankEmployer({ ...fakeCustomer[3], bank });
      let res = employer.filterData("bela bela");
      expect(mockFilterData).toHaveBeenCalledTimes(1);
      expect(res["status"]).toBeFalsy();
    });
  });

  describe("Show method", () => {
    it("show db method", () => {
      let bank = new Bank();
      let employer = new BankEmployer({ ...fakeCustomer[3], bank });
      let res = employer.showDb();
      expect(mockShowDb).toHaveBeenCalledTimes(1);
      expect(res.length).toEqual(bank.customers.length);
    });
  });

  describe("Find Method", () => {
    it("find method with correct id ", () => {
      let bank = new Bank();
      let employer = new BankEmployer({ ...fakeCustomer[3], bank });
      let res = employer.find(fakeCustomer[0]["id"]);
      expect(mockFind).toHaveBeenCalledTimes(1);
      expect(res).toBeInstanceOf(Object);
    });

    it("find method with incorrect id ", () => {
      let bank = new Bank();
      let employer = new BankEmployer({ ...fakeCustomer[3], bank });
      let res = employer.find(fakeCustomer[0]["id"]);
      expect(mockFind).toHaveBeenCalledTimes(1);
      expect(res).toBeTruthy();
    });
  });

  describe("Create method", () => {
    it("create Method with correct id ", () => {
      let bank = new Bank();
      let employer = new BankEmployer({ ...fakeCustomer[3], bank });
      let preLength = bank.customers.length;
      let res = employer.create("siaw", "mhb", "222", "123", 1000);
      expect(mockCreate).toHaveBeenCalledTimes(1);
      expect(res["status"]).toBeTruthy();
      expect(bank.customers.length).toEqual(preLength + 1);
    });

    it("create Method with incorrect id(exist)", () => {
      let bank = new Bank();
      let employer = new BankEmployer({ ...fakeCustomer[3], bank });
      let res = employer.create("siaw", "mhb", "1", "1", 1000);
      expect(mockCreate).toHaveBeenCalledTimes(1);
      expect(res["status"]).toBeFalsy();
    });
  });

  describe("Update Method", () => {
    it("update method with correct id", () => {
      let bank = new Bank();
      let employer = new BankEmployer({ ...fakeCustomer[3], bank });
      let res = employer.update(fakeCustomer[0]["id"], { name: "khalife" });
      expect(mockUpdate).toHaveBeenCalledTimes(1);
      expect(res["status"]).toBeTruthy();
      expect(bank.customers[0]["name"]).toEqual("khalife");
    });

    it("update method with incorrect id", () => {
      let bank = new Bank();
      let employer = new BankEmployer({ ...fakeCustomer[3], bank });
      let res = employer.update("bela bela", { name: "khalife" });
      expect(mockUpdate).toHaveBeenCalledTimes(1);
      expect(res["status"]).toBeFalsy();
    });
  });

  describe("Limit Account", () => {
    it("limit method with correct id", () => {
      let bank = new Bank();
      let employer = new BankEmployer({ ...fakeCustomer[3], bank });
      expect(bank.customers[0]["limited"]).toBeFalsy();
      let res = employer.limit(fakeCustomer[0]["id"]);
      expect(mockLimit).toHaveBeenCalledTimes(1);
      expect(res["status"]).toBeTruthy();
      expect(bank.customers[0]["limited"]).toBeTruthy();
    });

    it("limit method with incorrect id", () => {
      let bank = new Bank();
      let employer = new BankEmployer({ ...fakeCustomer[3], bank });
      expect(bank.customers[0]["limited"]).toBeFalsy();
      let res = employer.limit("bela");
      expect(mockLimit).toHaveBeenCalledTimes(1);
      expect(res["status"]).toBeFalsy();
    });
  });

  describe("Remove Account", () => {
    it("remove limit method with correct id", () => {
      let bank = new Bank();
      let employer = new BankEmployer({ ...fakeCustomer[3], bank });
      expect(bank.customers[1]["limited"]).toBeTruthy();
      let res = employer.removeLimit(fakeCustomer[1]["id"]);
      expect(mockRemoveLimit).toHaveBeenCalledTimes(1);
      expect(res["status"]).toBeTruthy();
      expect(bank.customers[1]["limited"]).toBeFalsy();
    });

    it("remove limit method with incorrect id", () => {
      let bank = new Bank();
      let employer = new BankEmployer({ ...fakeCustomer[3], bank });
      expect(bank.customers[1]["limited"]).toBeTruthy();
      let res = employer.removeLimit("bela bela");
      expect(mockRemoveLimit).toHaveBeenCalledTimes(1);
      expect(res["status"]).toBeFalsy();
    });
  });

  describe("Delete Method", () => {
    it("delete method with correct id", () => {
      let bank = new Bank();
      let employer = new BankEmployer({ ...fakeCustomer[3], bank });
      let preLength = bank.customers.length;
      let res = employer.delete(fakeCustomer[0]["id"]);
      expect(mockDelete).toHaveBeenCalledTimes(1);
      expect(res["status"]).toBeTruthy();
      expect(bank.customers.length).toEqual(preLength - 1);
    });

    it("delete method with incorrect id", () => {
      let bank = new Bank();
      let employer = new BankEmployer({ ...fakeCustomer[3], bank });
      let res = employer.delete("bela");
      expect(mockDelete).toHaveBeenCalledTimes(1);
      expect(res["status"]).toBeFalsy();
    });
  });
});
