/**
 * @author Pruthvi Kumar
 * @email pruthvikumar.123@gmail.com
 * @create date 2018-09-20 16:50:12
 * @modify date 2018-09-20 16:50:12
 * @desc Retailer in our E-Com platform.
*/
pragma solidity ^0.4.17;
// We have to specify what version of compiler this code will compile with

contract Retailer {

  /* Events */
  event OrderRaisedOrUpdated(uint idOrder);

  struct AvailableRetailer {
    uint idCustomer;
    string customerName;
  }

  struct Orderlog {
    uint idOrder;
    uint idCustomer;
    string itemName;
    uint quantity;
    uint forecast;
    bool status;
  }

  // STATE Variables.
  uint numberOfItemsPurchased;
  uint numberOfItemsReceived;

  // Mappings 
  mapping (uint => AvailableRetailer) customers;
  mapping (uint => Orderlog) orderLogs;

  /* Constructor */
  constructor() public {
      /* For the case of demo, adding a customer in constructor. You can take this idea and extend the contract to contain addCustomer section and hence maintain customerDB in the Blockchain! */
      customers[0] = AvailableRetailer(1, "Eka");
  }

  /* TRANSACTIONS */
  function purchaseItem(string itemName, uint quantity, uint forecast) public {
    uint idOrder = numberOfItemsPurchased++;
    orderLogs[idOrder] = Orderlog(idOrder, 0, itemName, quantity, forecast, false);
    emit OrderRaisedOrUpdated(idOrder);
  }

  function recieveItem(uint idOrder) public {
      numberOfItemsReceived++;
      orderLogs[idOrder].status = true;
      emit OrderRaisedOrUpdated(idOrder);
  }

  /* GETTERS */
  function getOrderDetails(uint idOrder) view public returns (string, uint, uint, bool){
    /*returns itemName, quantity & completionStatus*/
    return (orderLogs[idOrder].itemName, orderLogs[idOrder].quantity, orderLogs[idOrder].forecast, orderLogs[idOrder].status);
  }

  function getNumberOfItemsPurchased() view public returns (uint) {
    return numberOfItemsPurchased;
  }

  function getNumberOfItemsReceived() view public returns (uint) {
    return numberOfItemsReceived;
  }

}