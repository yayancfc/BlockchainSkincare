/**
 * @author Pruthvi Kumar
 * @email pruthvikumar.bk@anz.com
 * @create date 2018-09-21 13:09:20
 * @modify date 2018-09-21 13:09:20
 * @desc Client side code for connecting Suppliers to Ethereum backend!
 */

import React, { Component } from 'react';
import { perusahaanKosmetikContract, distributorContract, web3} from './EthereumSetup';
import { Grid, Row, Col, Panel, Tabs, Tab, FormGroup, InputGroup, Button, FormControl, Table } from 'react-bootstrap';
import '../App.css';


class SuppliersClient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            supplierContract_blockchainRecordedItemIds: [],
            supplierContract_blockchainRecordedPurchaseOrderServices: [],
            customerContract_blockchainRecordedPurchaseOrderIds: []
        }

        /* Getters */
        this.supplierContract_getTotalNumberOfAvailableItems = this.supplierContract_getTotalNumberOfAvailableItems.bind(this);
        this.supplierContract_getTotalNumberOfOrdersProcessed = this.supplierContract_getTotalNumberOfOrdersProcessed.bind(this);
        this.customerContract_getOrderDetails = this.customerContract_getOrderDetails.bind(this);

        /* transactions */
        this.supplierContract_addItem = this.supplierContract_addItem.bind(this);
        this.supplierContract_processOrder = this.supplierContract_processOrder.bind(this);
        this.customerContract_recieveItem = this.customerContract_recieveItem.bind(this);

        //this.triggerSupplierContractEventListeners = this.triggerSupplierContractEventListeners.bind(this);
        this.addNewItemToMarketBySupplier = this.addNewItemToMarketBySupplier.bind(this);
    }

    componentDidMount(){
    	console.log(this.props.accounts, 'zz1')

    }

    supplierContract_getTotalNumberOfAvailableItems() {
        return perusahaanKosmetikContract.methods.getTotalNumberOfAvailableItems().call();
    }
    supplierContract_getTotalNumberOfOrdersProcessed() {
        return perusahaanKosmetikContract.methods.getTotalNumberOfOrdersProcessed().call();
    }
    customerContract_getOrderDetails(idOrder) {
        return distributorContract.methods.getOrderDetails(idOrder).call();
    }

    supplierContract_addItem(itemName, stock, price) {
        perusahaanKosmetikContract.methods.addProduct(itemName ,stock, price).send({
            from: this.props.accounts[0],
            gas: 200000
        },(err, results) => {
            if (err) {
                console.error('[Supplier Contract] Error during adding new item to marketPlace', err);
            } else {
                console.log('[Supplier Contract] - New Item added to Marketplace', results);
            }
        });
    }
    supplierContract_processOrder(idOrder, idCustomer ,itemName, qty) {
        this.props.addNewProcess({returnValues:{idOrder: idOrder, idOfCustomer: idCustomer, status: true}})
        perusahaanKosmetikContract.methods.processOrder(idOrder, idCustomer, itemName, qty).send({
            from: this.props.accounts[0],
            gas: 200000
        }, (err, results) => {
            if (err) {
                console.error('[Supplier Contract] Error during procesing an order', err);
            } else {
                console.log('[Supplier Contract] - order successfully processed by supplier', results.toString());
            }
        });
    }

    customerContract_recieveItem(idOrder) {
        distributorContract.methods.recieveItem(idOrder).send({
            from: this.props.accounts[0],
            gas: 200000
        }, (err, results) => {
            if (err) {
                console.error('[Customer Contract] Error during recieving a processed item', err);
            } else {
                console.log('[Customer Contract] - Item successfully recieved by Customer', results.toString());
            }
        });
    }

    addNewItemToMarketBySupplier(e){
        e.preventDefault();
        const itemName = e.target.elements.itemName.value;
        const price = e.target.elements.price.value;
        const stock = e.target.elements.stock.value;
        this.props.addNewItem({id: this.props.data.length, 0:itemName,1:price, 2:stock})
        this.supplierContract_addItem(itemName, stock, price);
    }

    render(){
        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} md={6}>
                        <Panel>
                            <Panel.Heading>Perusahaan Kosmetik Section</Panel.Heading>
                            <Panel.Body>
                                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                                    <Tab eventKey={1} title="Add Items to Market">
                                    <br/> <br/>
                                        <form onSubmit={this.addNewItemToMarketBySupplier}>
                                            <FormGroup>
                                            <InputGroup>
                                                <InputGroup.Button>
                                                <Button>Item Name </Button>
                                                </InputGroup.Button>
                                                <FormControl ref="itemName" name="itemName" placeholder="eg. Toy / Shirt / CoffeeMug etc.," type="text"/>
                                            </InputGroup>

                                            <InputGroup>
                                                <InputGroup.Button>
                                                <Button>Stock</Button>
                                                </InputGroup.Button>
                                                <FormControl ref="stock" name="stock" placeholder="Stock" type="number"/>
                                            </InputGroup>

                                            <InputGroup>
                                                <InputGroup.Button>
                                                <Button>Price <small>(USD)</small></Button>
                                                </InputGroup.Button>
                                                <FormControl ref="price" name="price" placeholder="Price per unit in USD" type="number"/>
                                            </InputGroup>
                                            </FormGroup>

                                            <FormGroup>
                                            <Button bsStyle="primary" label="Login" id="loginButton" type="submit" active>Add to Market</Button>
                                            </FormGroup>
                                        </form>
                                    </Tab>
                                    <Tab eventKey={2} title="Process Order(s)">
                                        <h4>Order details</h4>
                                        <small>Click on Order to process/complete it!</small>
                                        <Table striped bordered condensed hover>
                                            <thead>
                                                <tr>
                                                <th>Order ID</th>
                                                <th>Customer Name</th>
                                                <th>Item Name</th>
                                                <th>Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                            {this.props.dataOrder.map(itemId => {

                                                return (<tr className="pointIt" onClick={() => this.supplierContract_processOrder(itemId['idOrder'], 1, itemId[0], itemId[1])}>
                                                    <td>
                                                    {itemId['idOrder']}
                                                    </td>
                                                    <td>
                                                    John Snow
                                                    </td>
                                                    <td>
                                                    {itemId[0]}
                                                    </td>
                                                    <td>
                                                    {itemId[1]}
                                                    </td>
                                                </tr>);
                                                }
                                            )}
                                            </tbody>
                                            </Table>

                                            <h4>Pocessed Order(s)</h4>
                                            <Table striped bordered condensed hover>
                                                <thead>
                                                    <tr>
                                                    <th>Order ID</th>
                                                    <th>Customer Name</th>
                                                    <th>Order Completed</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.props.processOrder.map(item => {
                                                        console.log('order',item)
                                                    return (<tr key={item.returnValues['idOrder']}>
                                                        <td>
                                                        {item.returnValues['idOrder']}
                                                        </td>
                                                        <td>
                                                        John Snow
                                                        </td>
                                                        <td>
                                                        {item.returnValues['status'] === true ? 'Completed' : 'InProgress'}
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
        )
    }

}

export default SuppliersClient;