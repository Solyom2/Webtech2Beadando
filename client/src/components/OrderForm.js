import React from "react"
import OrderActions from "../actions/OrderActions";
import OrderStore from "../store/OrderStore";
import CustomerOrderList from "../components/CustomerOrderList"

class OrderForm  extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            order: {
                id: null,
                customername: "",
                address: "",
                windowlength: null,
                windowwidth: null,
                shuttertype: "",
                shuttercolor: "",
                quantity: null
            }
        };
    }

    _onChange(){
        this.setState({});
    }

    componentDidMount(){
        OrderStore.addChangeListener(this._onChange)
    }

    componentWillUnmount(){
        OrderStore.removeChangeListener(this._onChange)
    }

    render() {
        return(
            <div className="container">

                <p className="bg-primary text-center h3">Shutter order form</p>

                <div className="row">Customer name
                    <input type="text" onChange={(event) => {
                        this.state.order.customername = event.target.value;
                        this.setState({order: this.state.order})
                    }}/>
                </div>

                <div className="row">Address
                    <input type="text" onChange={(event) => {
                        this.state.order.address = event.target.value;
                        this.setState({order: this.state.order})
                    }}/>
                </div>

                <div className="row">Window length
                    <input type="number" onChange={(event) => {
                        this.state.order.windowlength = event.target.value;
                        this.setState({order: this.state.order})
                    }}/>
                </div>

                <div className="row">Window width
                    <input type="number" onChange={(event) => {
                        this.state.order.windowwidth = event.target.value;
                        this.setState({order: this.state.order})
                    }}/>
                </div>

                <div className="row">Shuttertype
                    <input type="text" onChange={(event) => {
                        this.state.order.shuttertype = event.target.value;
                        this.setState({order: this.state.order})
                    }}/>
                </div>

                <div className="row">Shuttercolor
                    <input type="text" onChange={(event) => {
                        this.state.order.shuttercolor = event.target.value;
                        this.setState({order: this.state.order})
                    }}/>
                </div>

                <div className="row">Quantity
                    <input type="number" onChange={(event) => {
                        this.state.order.quantity = event.target.value;
                        this.setState({order: this.state.order})
                    }}/>
                </div>

                <button
                    onClick={() => {
                        OrderActions.createOrder(this.state);
                        OrderStore._customername = this.state.order.customername;
                        OrderActions.listCustomerOrders(OrderStore._customername);
                    }}
                    className="btn btn-success">Submit
                </button>

            </div>
        );
    }

}

export default OrderForm;