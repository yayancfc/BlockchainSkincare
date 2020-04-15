/**
 * @author Pruthvi Kumar
 * @email pruthvikumar.123@gmail.com
 * @create date 2018-09-20 16:50:12
 * @modify date 2018-09-20 16:50:12
 * @desc PTAdev in our E-Com platform.
*/
pragma solidity ^0.4.17;
// We have to specify what version of compiler this code will compile with

contract PTAdev {

  /* Events */
  event OrderRaisedOrUpdated(uint idOrder);
  event ProductAdded(uint idProduct);
  event ProcessAnOrder(uint idOfCustomer, uint idOrder, string productName, uint quantity, bool status);
  
  struct AvailableMaterial {
    uint idMaterial;
    uint quantity;
    string MaterialName;
  }
  struct Orderlogsupplier {
    uint idOrder;
    uint idMaterial;
    string materialName;
    uint quantity;
    bool status;
  }
  struct Product {
    uint idProduct;
    string productName;
    uint productStock;
    uint leadtimeProduct;
    uint price;
  }
  struct Orderlogcustomer {
    uint idOrder;
    uint idCustomer;
    string productName;
    uint quantity;
    bool status;
  }

  // STATE Variables.
  uint numberOfmaterialsPurchased;
  uint numberOfMaterialsReceived;
  uint numberOfProductAvailable;
  uint numberOfOrdersProcessed;

  // Mappings 
  mapping (uint => AvailableMaterial) PTAdev;
  mapping (uint => Orderlogsupplier) orderLogssupplier;
  mapping (uint => Product) products;
  mapping (uint => Orderlogcustomer) orderLogscustomer;

  /* Constructor */
  constructor() public {
      /* For the case of demo, adding a customer in constructor. You can take this idea and extend the contract to contain addCustomer section and hence maintain customerDB in the Blockchain! */
      PTAdev[0] = AvailableMaterial(1, 1, "Minyak Kelapa");
  }

  /* TRANSACTIONS */
  function purchaseMaterial(string materialName, uint quantity) public {
    uint idOrder = numberOfmaterialsPurchased++;
    orderLogssupplier[idOrder] = Orderlogsupplier(idOrder, 0, materialName, quantity, false);
    emit OrderRaisedOrUpdated(idOrder);
  }

  function recieveMaterial(uint idOrder) public {
      numberOfMaterialsReceived++;
      orderLogssupplier[idOrder].status = true;
      emit OrderRaisedOrUpdated(idOrder);
  }
  function addProduct(string productName, uint productStock, uint leadtimeProduct, uint price) public {
    uint idProduct = numberOfProductAvailable++;
    products[idProduct] = Product(idProduct, productName, productStock, leadtimeProduct, price);
    emit ProductAdded(idProduct);
  }

  function processOrder(uint idOrder, uint idCustomer, string sendOrder, uint quantity) public {
    orderLogscustomer[idOrder] = Orderlogcustomer(idCustomer, idOrder, sendOrder, quantity, true);
    numberOfOrdersProcessed ++;
    emit ProcessAnOrder(idCustomer, idOrder, sendOrder, quantity, true);
  }

  /* GETTERS */
  function getOrderDetails(uint idOrder) view public returns (string, uint, bool){
    /*returns materialName, quantity & completionStatus*/
    return (orderLogssupplier[idOrder].materialName, orderLogssupplier[idOrder].quantity, orderLogssupplier[idOrder].status);
  }

  function getNumberOfMaterialsPurchased() view public returns (uint) {
    return numberOfmaterialsPurchased;
  }

  function getNumberOfMaterialsReceived() view public returns (uint) {
    return numberOfMaterialsReceived;
  }

  function getProduct(uint idProduct) view public returns (string, uint, uint){
    /*returns productName and its price*/
    return (products[idProduct].productName, products[idProduct].productStock, products[idProduct].price);
  }

  function getStatus(uint idOrder) view public returns (bool) {
    /*returns completion status*/
    return (orderLogscustomer[idOrder].status);
  }

  function getTotalNumberOfAvailableProducts() view public returns (uint) {
    return numberOfProductAvailable;
  }

  function getTotalNumberOfOrdersProcessed() view public returns (uint){
    return numberOfOrdersProcessed;
  }

}