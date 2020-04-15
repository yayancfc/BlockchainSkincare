/**
 * @author Pruthvi Kumar
 * @email pruthvikumar.123@gmail.com
 * @create date 2018-09-20 16:50:12
 * @modify date 2018-09-20 16:50:12
 * @desc PerusahaanKosmetik in our E-Com platform.
*/
pragma solidity ^0.4.17;
// We have to specify what version of compiler this code will compile with

contract PerusahaanKosmetik {

  /* Events */
  event OrderRaisedOrUpdated(uint idOrder);
  event ProductAdded(uint idProduct);
  event ProcessAnOrder(uint idOfDsitributor, uint idOrder, string productName, uint quantity, bool status);
  
  struct AvailableProductMaklon {
    uint idProductMaklon;
    uint quantity;
    string ProductMaklonName;
  }
  struct Orderlogmaklon {
    uint idOrder;
    uint idProductmaklon;
    string productmaklonName;
    uint quantity;
    bool status;
  }
  struct Product {
    uint idProduct;
    string productName;
    uint productStock;
    uint price;
  }
  struct Orderlogdistributor {
    uint idOrder;
    uint idDistributor;
    string productName;
    uint quantity;
    bool status;
  }

  // STATE Variables.
  uint numberOfProductmaklonsPurchased;
  uint numberOfproductmaklonsReceived;
  uint numberOfProductAvailable;
  uint numberOfOrdersProcessed;

  // Mappings 
  mapping (uint => AvailableProductMaklon) PerusahaanKosmetik;
  mapping (uint => Orderlogmaklon) orderLogsmaklon;
  mapping (uint => Product) products;
  mapping (uint => Orderlogdistributor) orderLogsdistributor;

  /* Constructor */
  constructor() public {
      /* For the case of demo, adding a customer in constructor. You can take this idea and extend the contract to contain addCustomer section and hence maintain customerDB in the Blockchain! */
      PerusahaanKosmetik[0] = AvailableProductMaklon(1, 1, "Natural Kolagen Body Soap");
  }

  /* TRANSACTIONS */
  function purchaseProductmaklon(string productmaklonName, uint quantity) public {
    uint idOrder = numberOfProductmaklonsPurchased++;
    orderLogsmaklon[idOrder] = Orderlogmaklon(idOrder, 0, productmaklonName, quantity, false);
    emit OrderRaisedOrUpdated(idOrder);
  }

  function recieveProductmaklon(uint idOrder) public {
      numberOfproductmaklonsReceived++;
      orderLogsmaklon[idOrder].status = true;
      emit OrderRaisedOrUpdated(idOrder);
  }
  function addProduct(string productName, uint productStock, uint price) public {
    uint idProduct = numberOfProductAvailable++;
    products[idProduct] = Product(idProduct, productName, productStock, price);
    emit ProductAdded(idProduct);
  }

  function processOrder(uint idOrder, uint idDistributor, string sendOrder, uint quantity) public {
    orderLogsdistributor[idOrder] = Orderlogdistributor(idDistributor, idOrder, sendOrder, quantity, true);
    numberOfOrdersProcessed ++;
    emit ProcessAnOrder(idDistributor, idOrder, sendOrder, quantity, true);
  }

  /* GETTERS */
  function getOrderDetails(uint idOrder) view public returns (string, uint, bool){
    /*returns productmaklonName, quantity & completionStatus*/
    return (orderLogsmaklon[idOrder].productmaklonName, orderLogsmaklon[idOrder].quantity, orderLogsmaklon[idOrder].status);
  }

  function getNumberOfProductmaklonsPurchased() view public returns (uint) {
    return numberOfProductmaklonsPurchased;
  }

  function getNumberOfProductmaklonsReceived() view public returns (uint) {
    return numberOfproductmaklonsReceived;
  }

  function getProduct(uint idProduct) view public returns (string, uint, uint){
    /*returns productName and its price*/
    return (products[idProduct].productName, products[idProduct].productStock, products[idProduct].price);
  }

  function getStatus(uint idOrder) view public returns (bool) {
    /*returns completion status*/
    return (orderLogsdistributor[idOrder].status);
  }

  function getTotalNumberOfAvailableProducts() view public returns (uint) {
    return numberOfProductAvailable;
  }

  function getTotalNumberOfOrdersProcessed() view public returns (uint){
    return numberOfOrdersProcessed;
  }

}