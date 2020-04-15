/**
 * @author Pruthvi Kumar
 * @email pruthvikumar.123@gmail.com
 * @create date 2018-09-20 16:50:12
 * @modify date 2018-09-20 16:50:12
 * @desc Distributor in our E-Com platform.
*/
pragma solidity ^0.4.17;
// We have to specify what version of compiler this code will compile with

contract Distributor {

  /* Events */
  event OrderRaisedOrUpdated(uint idOrder);
  event ProductAdded(uint idProduct);
  event ProcessAnOrder(uint idOfDsitributor, uint idOrder,string ProductName, uint quantity, bool status);
  
  struct AvailableProduct {
    uint idProduct;
    uint quantity;
    string ProductName;
  }
  struct OrderlogPerusahaankosmetik {
    uint idOrder;
    uint idProduct;
    string productName;
    uint quantity;
    bool status;
  }
  struct Product {
    uint idProduct;
    string productName;
    uint productStock;
    uint price;
  }
  struct Orderlogretailer {
    uint idOrder;
    uint idRetailer;
    string productName;
    uint quantity;
    bool status;
  }

  // STATE Variables.
  uint numberOfProductsPurchased;
  uint numberOfproductsReceived;
  uint numberOfProductAvailable;
  uint numberOfOrdersProcessed;

  // Mappings 
  mapping (uint => AvailableProduct) Distributor;
  mapping (uint => OrderlogPerusahaankosmetik) orderLogsperusahaankosmetik;
  mapping (uint => Product) products;
  mapping (uint => Orderlogretailer) orderLogsretailer;

  /* Constructor */
  constructor() public {
      /* For the case of demo, adding a customer in constructor. You can take this idea and extend the contract to contain addCustomer section and hence maintain customerDB in the Blockchain! */
      Distributor[0] = AvailableProduct(1, 1, "Natural Kolagen Body Soap");
  }

  /* TRANSACTIONS */
  function purchaseProduct(uint idProduct, string productName, uint quantity) public {
    uint idOrder = numberOfProductsPurchased++;
    orderLogsperusahaankosmetik[idOrder] = OrderlogPerusahaankosmetik(idOrder, idProduct, productName, quantity, false);
    emit OrderRaisedOrUpdated(idOrder);
  }

  function recieveProduct(uint idOrder) public {
      numberOfproductsReceived++;
      orderLogsperusahaankosmetik[idOrder].status = true;
      emit OrderRaisedOrUpdated(idOrder);
  }
  function addProduct(string productName, uint productStock, uint price) public {
    uint idProduct = numberOfProductAvailable++;
    products[idProduct] = Product(idProduct, productName, productStock, price);
    emit ProductAdded(idProduct);
  }

  function processOrder(uint idOrder, uint idRetailer, string sendOrder, uint quantity) public {
    orderLogsretailer[idOrder] = Orderlogretailer(idOrder, idRetailer, sendOrder, quantity, true);
    numberOfOrdersProcessed ++;
    emit ProcessAnOrder(idRetailer, idOrder, sendOrder, quantity, true);
  }

  /* GETTERS */
  function getOrderDetails(uint idOrder) view public returns (string, uint, bool){
    /*returns productName, quantity & completionStatus*/
    return (orderLogsperusahaankosmetik[idOrder].productName, orderLogsperusahaankosmetik[idOrder].quantity, orderLogsperusahaankosmetik[idOrder].status);
  }

  function getNumberOfProductsPurchased() view public returns (uint) {
    return numberOfProductsPurchased;
  }

  function getNumberOfProductsReceived() view public returns (uint) {
    return numberOfproductsReceived;
  }

  function getProduct(uint idProduct) view public returns (string, uint, uint){
    /*returns productName and its price*/
    return (products[idProduct].productName, products[idProduct].productStock, products[idProduct].price);
  }

  function getStatus(uint idOrder) view public returns (bool) {
    /*returns completion status*/
    return (orderLogsretailer[idOrder].status);
  }

  function getTotalNumberOfAvailableProducts() view public returns (uint) {
    return numberOfProductAvailable;
  }

  function getTotalNumberOfOrdersProcessed() view public returns (uint){
    return numberOfOrdersProcessed;
  }

}