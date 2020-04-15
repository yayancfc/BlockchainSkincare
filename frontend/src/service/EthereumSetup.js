/**
 * @author Pruthvi Kumar
 * @email pruthvikumar.123@gmail.com
 * @desc Web3 setup to bridge ethereum backend to react frontend!
 */

import Web3 from 'web3';

 const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8484"));
// let web3 = new Web3(window.web3.currentProvider);
// 	web3 = window.ethereum.enable().catch(error => {
// 		console.log(error)
// 	})

let SupplierAddress = '0x00038560965C24E472D774e0A709487f8608aED4';//PASTE YOUR SUPPLIER CONTRACT ADDRESS HERE
let PTAdevAddress = '0xE665d18077A2ADAf999f5084357F9D026C528e67';//PASTE YOUR CUSTOMER CONTRACT ADDRESS HERE
let PerusahaanKosmetikAddress = '0x97c29711c7E898Fd89846Cc9C0Af14FcE3524465';
let DistributorAddress = '0x8C7e5E15f6495E976C022d1C34E3FC30196458dA';
let RetailerAddress = '0x8879F25153ADCe4BF20ff673c9b0918676191bf8';

let SupplierABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "idOrder",
				"type": "uint256"
			},
			{
				"name": "idCustomer",
				"type": "uint256"
			},
			{
				"name": "sendOrder",
				"type": "string"
			}
		],
		"name": "processOrder",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "idItem",
				"type": "uint256"
			}
		],
		"name": "getItem",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTotalNumberOfOrdersProcessed",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "idOrder",
				"type": "uint256"
			}
		],
		"name": "getStatus",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTotalNumberOfAvailableItems",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "itemName",
				"type": "string"
			},
			{
				"name": "itemStock",
				"type": "uint256"
			},
			{
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "addItem",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "idItem",
				"type": "uint256"
			}
		],
		"name": "ItemAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "idOfCustomer",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "idOrder",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "productName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "status",
				"type": "bool"
			}
		],
		"name": "ProcessAnOrder",
		"type": "event"
	}
]

let PTAdevABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "productName",
				"type": "string"
			},
			{
				"name": "productStock",
				"type": "uint256"
			},
			{
				"name": "leadtimeProduct",
				"type": "uint256"
			},
			{
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "addProduct",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "idOrder",
				"type": "uint256"
			},
			{
				"name": "idCustomer",
				"type": "uint256"
			},
			{
				"name": "sendOrder",
				"type": "string"
			},
			{
				"name": "quantity",
				"type": "uint256"
			}
		],
		"name": "processOrder",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTotalNumberOfOrdersProcessed",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "idOrder",
				"type": "uint256"
			}
		],
		"name": "getStatus",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "idOrder",
				"type": "uint256"
			}
		],
		"name": "recieveMaterial",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "materialName",
				"type": "string"
			},
			{
				"name": "quantity",
				"type": "uint256"
			}
		],
		"name": "purchaseMaterial",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "idProduct",
				"type": "uint256"
			}
		],
		"name": "getProduct",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumberOfMaterialsReceived",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTotalNumberOfAvailableProducts",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "idOrder",
				"type": "uint256"
			}
		],
		"name": "getOrderDetails",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumberOfMaterialsPurchased",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "idOrder",
				"type": "uint256"
			}
		],
		"name": "OrderRaisedOrUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "idProduct",
				"type": "uint256"
			}
		],
		"name": "ProductAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "idOfCustomer",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "idOrder",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "productName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "quantity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "status",
				"type": "bool"
			}
		],
		"name": "ProcessAnOrder",
		"type": "event"
	}
]

let PerusahaanKosmetikABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "productmaklonName",
				"type": "string"
			},
			{
				"name": "quantity",
				"type": "uint256"
			}
		],
		"name": "purchaseProductmaklon",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "productName",
				"type": "string"
			},
			{
				"name": "productStock",
				"type": "uint256"
			},
			{
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "addProduct",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "idOrder",
				"type": "uint256"
			},
			{
				"name": "idDistributor",
				"type": "uint256"
			},
			{
				"name": "sendOrder",
				"type": "string"
			},
			{
				"name": "quantity",
				"type": "uint256"
			}
		],
		"name": "processOrder",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "idOrder",
				"type": "uint256"
			}
		],
		"name": "recieveProductmaklon",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTotalNumberOfOrdersProcessed",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "idOrder",
				"type": "uint256"
			}
		],
		"name": "getStatus",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "idProduct",
				"type": "uint256"
			}
		],
		"name": "getProduct",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTotalNumberOfAvailableProducts",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumberOfProductmaklonsPurchased",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "idOrder",
				"type": "uint256"
			}
		],
		"name": "getOrderDetails",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumberOfProductmaklonsReceived",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "idOrder",
				"type": "uint256"
			}
		],
		"name": "OrderRaisedOrUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "idProduct",
				"type": "uint256"
			}
		],
		"name": "ProductAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "idOfDsitributor",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "idOrder",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "productName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "quantity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "status",
				"type": "bool"
			}
		],
		"name": "ProcessAnOrder",
		"type": "event"
	}
]

let DistributorABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "idOrder",
				"type": "uint256"
			}
		],
		"name": "recieveProduct",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "productName",
				"type": "string"
			},
			{
				"name": "productStock",
				"type": "uint256"
			},
			{
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "addProduct",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "idOrder",
				"type": "uint256"
			},
			{
				"name": "idRetailer",
				"type": "uint256"
			},
			{
				"name": "sendOrder",
				"type": "string"
			},
			{
				"name": "quantity",
				"type": "uint256"
			}
		],
		"name": "processOrder",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTotalNumberOfOrdersProcessed",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "idOrder",
				"type": "uint256"
			}
		],
		"name": "getStatus",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "idProduct",
				"type": "uint256"
			}
		],
		"name": "getProduct",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumberOfProductsPurchased",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "idProduct",
				"type": "uint256"
			},
			{
				"name": "productName",
				"type": "string"
			},
			{
				"name": "quantity",
				"type": "uint256"
			}
		],
		"name": "purchaseProduct",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTotalNumberOfAvailableProducts",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "idOrder",
				"type": "uint256"
			}
		],
		"name": "getOrderDetails",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumberOfProductsReceived",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "idOrder",
				"type": "uint256"
			}
		],
		"name": "OrderRaisedOrUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "idProduct",
				"type": "uint256"
			}
		],
		"name": "ProductAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "idOfDsitributor",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "idOrder",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "ProductName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "quantity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "status",
				"type": "bool"
			}
		],
		"name": "ProcessAnOrder",
		"type": "event"
	}
]

let RetailerABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "itemName",
				"type": "string"
			},
			{
				"name": "quantity",
				"type": "uint256"
			},
			{
				"name": "forecast",
				"type": "uint256"
			}
		],
		"name": "purchaseItem",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "idOrder",
				"type": "uint256"
			}
		],
		"name": "recieveItem",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "idOrder",
				"type": "uint256"
			}
		],
		"name": "OrderRaisedOrUpdated",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumberOfItemsPurchased",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getNumberOfItemsReceived",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "idOrder",
				"type": "uint256"
			}
		],
		"name": "getOrderDetails",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

//web3.eth.defaultAccount = web3.eth.accounts[0];

const supplierContract = new web3.eth.Contract(SupplierABI, SupplierAddress);
const pTAdevContract = new web3.eth.Contract(PTAdevABI, PTAdevAddress);
const perusahaanKosmetikContract = new web3.eth.Contract(PerusahaanKosmetikABI, PerusahaanKosmetikAddress);
const distributorContract = new web3.eth.Contract(DistributorABI, DistributorAddress);
const retailerContract = new web3.eth.Contract(RetailerABI, RetailerAddress);

export {
    supplierContract,
    pTAdevContract,
    perusahaanKosmetikContract,
    distributorContract,
    retailerContract,
    web3
};