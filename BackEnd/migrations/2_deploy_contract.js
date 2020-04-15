/**
 * @author Pruthvi Kumar
 * @email pruthvikumar.123@gmail.com
 * @desc Deployment desscription for all available solidity contracts.
*/

var Supplier = artifacts.require("./Supplier.sol");
var PTAdev = artifacts.require("./PTAdev.sol");
var PerusahaanKosmetik = artifacts.require("./PerusahaanKosmetik.sol");
var Distributor = artifacts.require("./Distributor.sol");
var Retailer = artifacts.require("./Retailer.sol");

module.exports = function(deployer) {

    /* IN TEST NETWORK, AMOUNT OF GAS IS AT DEVELOPER'S DISCRETION */
    deployer.deploy(Supplier, {gas: 1000000}).then(function(){
      console.log('********* Supplier is deployed! *********');
      /* PS: YOU COULD ALSO CREATE CONTRACT DEPENDENCIES HERE */
      return deployer.deploy(PTAdev, {gas: 1000000}).then(function(){
        console.log('********* PTAdev is deployed! *********');
      return deployer.deploy(PerusahaanKosmetik, {gas: 1000000}).then(function(){
            console.log('********* PerusahaanKosmetik is deployed! *********');
      return deployer.deploy(Distributor, {gas: 1000000}).then(function(){
            console.log('********* Distributor is deployed! *********');
       return deployer.deploy(Retailer, {gas: 1000000}).then(function(){
                console.log('********* Retailer is deployed! *********');
      });
    });
    });
});
    });
  };
  