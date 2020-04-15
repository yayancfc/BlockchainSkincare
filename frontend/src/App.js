import React, { Component } from 'react';
import './App.css';
import { Grid, Row, Col, Jumbotron } from 'react-bootstrap';
import PerusahaanKosmetikClient from './service/PerusahaanKosmetikClient';
import DistributorClient from './service/Distributor';
import { perusahaanKosmetikContract, distributorContract, web3} from './service/EthereumSetup';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      accounts: [],
      data: [],
      datas: [],
      w: Date.now(),

      dataOrder: [],
      dataOrders: [],

      processOrder: [],
      orderComplete: []
    }
  }

  addNewItem = (item) => {
      this.setState({
        datas: this.state.datas.concat(item)
      })
  }

  addNewOrder = (item) => {
    this.setState({
        dataOrders: this.state.dataOrders.concat(item)
      })
  }

  addNewProcess = (item) => {
    this.setState({
      processOrder: this.state.processOrder.concat(item)
    })
  }

  addNewComplete = (item) => {
    orderComplete: this.state.orderComplete.concat(item)
  }

  componentDidMount(){
    setInterval(() =>{
      this.setState({ w: Date.now()})
    }, 1000)
    web3.eth.getAccounts().then(account =>{
      this.setState({ 
          accounts: account
      })

      console.log(this.state.accounts)
    })

    perusahaanKosmetikContract.getPastEvents('ProductAdded', {
      fromBlock: 0, 
      toBlock : 'latest'
    },
    (err, events)=> {
      console.log('ass', events)
      const a = this.state.datas
      events.map(itemid => {
        return perusahaanKosmetikContract.methods.getProduct(itemid.returnValues.idProduct).call().then(data => {
          a.push({ ...data, ...{ id: itemid.returnValues.idProduct }})
        })
      })
    })

    distributorContract.getPastEvents('OrderRaisedOrUpdated', {
      fromBlock: 0, 
      toBlock : 'latest'
    },
    (err, events)=> {
       const a = this.state.dataOrders

       events.map(itemid => {

         return distributorContract.methods.getOrderDetails(itemid.returnValues.idOrder).call().then(data => {

        console.log('data',data)
           a.push({ ...data, ...{ idOrder: itemid.returnValues.idOrder }})
         })
       })
    })

    perusahaanKosmetikContract.getPastEvents('ProcessAnOrder', {
      fromBlock: 0, 
      toBlock : 'latest'
    },
    (err, events)=> {
        this.setState({
          processOrder:events
        })
    })

    perusahaanKosmetikContract.getPastEvents('ProcessAnOrder', {
      fromBlock: 0, 
      toBlock : 'latest'
    },
    (err, events)=> {
        const a = this.state.orderComplete
        events.map(itemid => {
          return distributorContract.methods.getOrderDetails(itemid.returnValues.idOrder).call().then(data => {
            a.push({ ...data, ...{ idOrder: itemid.returnValues.idOrder }})
          })
          //}

        })

    })

  }



  render() {
    return (
      <div className="App">
        <Jumbotron>
          {this.state.w}
          <h1>Decentralized E-Commerce!</h1>
          <p>Powered by Ethereum!</p>
        </Jumbotron>
        {/* STEPS:
          1. Add items for sale by supplier.
          2. Display them in customer section.
          3. Purchase an Item from customer section.
          4. Display purchaseOrder in Supplier section.
          5. Complete order in Supplier section.
          6. Show order completed in Customer section.
        */}
        
        <Grid>
            <Row className="show-grid">
                <Col xs={12} md={6}>
                  <DistributorClient 
                  data={this.state.datas}
                  accounts={this.state.accounts}
                  handleAddNewOrder={this.addNewOrder}
                  addNewOrder={this.state.dataOrders}
                  orderComplete={this.state.orderComplete}
                  />
                </Col>
                <Col xs={12} md={6}>
                  <PerusahaanKosmetikClient 
                  data={this.state.datas} 
                  addNewItem={this.addNewItem} 
                  accounts={this.state.accounts}
                  dataOrder={this.state.dataOrders}
                  addNewOrder={this.state.addNewOrder}
                  processOrder={this.state.processOrder}
                  addNewProcess={this.addNewProcess}/>
                </Col>
            </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
