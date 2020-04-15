/**
 * @author Pruthvi Kumar
 * @email pruthvikumar.bk@anz.com
 * @create date 2018-09-21 13:08:57
 * @modify date 2018-09-21 13:08:57
 * @desc Client side ocde for connecting Customers to Ethereum backend!
 */

import React, { Component } from 'react';
import { perusahaanKosmetikContract, distributorContract, web3} from './EthereumSetup';
import { Grid, Row, Col, Panel, Tabs, Tab, Table } from 'react-bootstrap';
import '../App.css';

class CustomersClient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            supplierContract_blockchainRecordedItemIds: [],
            customerContract_blockchainRecordedPurchaseOrderIds: []
        };

       

        /* Getters */
        this.supplierContract_getItem = this.supplierContract_getItem.bind(this);
        this.supplierContract_getStatus = this.supplierContract_getStatus.bind(this);
        this.customerContract_getOrderDetails = this.customerContract_getOrderDetails.bind(this);
        this.customerContract_getNumberOfItemsPurchased = this.customerContract_getNumberOfItemsPurchased.bind(this);
        this.customerContract_getNumberOfItemsReceived = this.customerContract_getNumberOfItemsReceived.bind(this);

        /* transactions */
        this.customerContract_purchaseItem = this.customerContract_purchaseItem.bind(this);
        this.customerContract_recieveItem = this.customerContract_recieveItem.bind(this);

        //this.triggerCustomerContractEventListeners = this.triggerCustomerContractEventListeners.bind(this);
        this.purchaseThisItem = this.purchaseThisItem.bind(this);
    }

    componentDidMount(){
    	console.log(this.props.accounts, 'zz')
    }
        
    supplierContract_getItem(idItem) {
        return perusahaanKosmetikContract.methods.getProduct(idItem).call();

    }
    supplierContract_getStatus(idOrder) {
        return perusahaanKosmetikContract.getStatus.call(idOrder);
    }

    customerContract_getOrderDetails(idOrder) {
        return distributorContract.getOrderDetails.call(idOrder);
    }
    customerContract_getNumberOfItemsPurchased() {
        return distributorContract.getNumberOfItemsPurchased.call();
    }
    customerContract_getNumberOfItemsReceived() {
        return distributorContract.getNumberOfItemsReceived.call();
    }

    customerContract_purchaseItem(itemName,  quantity) {
        distributorContract.methods.processOrder(0, 1 , itemName, quantity).send({
            from: this.props.accounts[0],
            gas: 200000
        }, (err, results) => {
            if (err) {
                console.error('[Customer Contract] Error during purchasing an item', err);
            } else {
                console.log('[Customer Contract] - item purchased', results.toString());
            }
        });
    }

    customerContract_recieveItem(idOrder) {
        distributorContract.methods.recieveItem(idOrder).send({
            from: this.props.accounts[0],
            gas: 200000
        }, (err, results) => {
            if (err) {
                console.error('[Customer Contract] Error during recieving ordered item', err);
            } else {
                console.log('[Customer Contract] - item recieved successfully!', results.toString());
            }
        });
    }

    purchaseThisItem(itemDetails){
        const props = this.props
        this.customerContract_purchaseItem(itemDetails.itemName, itemDetails.quantity);
        props.handleAddNewOrder({
            0:itemDetails.itemName,
            1:itemDetails.quantity,
            2:false,
            'idOrder':props.addNewOrder.length
        })
    }


    render(){
        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={6}>
                            <Panel>
                                <Panel.Heading>Distributor Section</Panel.Heading>
                                <Panel.Body>
                                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                                        <Tab eventKey={1} title="Market">
                                            {this.props.data.map(itemId => {
                                                console.log(itemId, 'wqwq')
                                                return (
                                                        <div key={itemId['id']}>
                                                        <Panel onClick={() => this.purchaseThisItem({
                                                            'id': itemId['id'],
                                                            'itemName': itemId[0],
                                                            'stock': itemId[2],
                                                            'price': parseInt(itemId[1]),
                                                            'quantity': 1
                                                        })}>
                                                            <Panel.Heading className="pointIt">HOT SALE! <small>Click to purchase!</small></Panel.Heading>
                                                            <Panel.Body>
                                                                Item Name : {itemId[0]} , Price : , ${parseInt(itemId[1])} , Stock : {itemId[2]}
                                                            </Panel.Body>
                                                        </Panel>
                                                    </div>

                                                    )
                                                
                                            })}
                                           
                                            
                                        </Tab>
                                        <Tab eventKey={2} title="Order(s)">
                                            <h4>Order details</h4>
                                            <Table striped bordered condensed hover>
                                                <thead>
                                                    <tr>
                                                    <th>Order ID</th>
                                                    <th>Item Name</th>
                                                    <th>Quantity</th>
                                                    <th>Order Completed</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.props.orderComplete.map(item => {
                                                        console.log('Completed',item)
                                                        return (<tr key={item['idOrder']}>
                                                            <td>
                                                            {item['idOrder']}
                                                            </td>
                                                            <td>
                                                            {item[0]}
                                                            </td>
                                                            <td>
                                                            {parseInt(item[1])}
                                                            </td>
                                                            <td>
                                                            {item[2] === false ? 'Completed' : 'InProgress'}
                                                            </td>
                                                        </tr>);
                                                    }
                                                )}
                                                </tbody>
                                            </Table>
                                        </Tab>
                                    </Tabs>
                                </Panel.Body>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

}

export default CustomersClient;