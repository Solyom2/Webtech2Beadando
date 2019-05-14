import React from "react"
import OrderActions from "../actions/OrderActions";
import OrderStore from "../store/OrderStore";
import PageActions from "../actions/PageActions";

class CustomerOrderList extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            orders : [],
            customername : ""
        };
    }

    _onChange(){
        this.setState({orders : OrderStore._orders});
    }

    componentDidMount(){
        OrderStore.addChangeListener(this._onChange)
    }

    componentWillUnmount(){
        OrderStore.removeChangeListener(this._onChange)
    }

    render() {
        return (
            <div className="container">

                <header className="-header navbar bg-light text-black-50 text-center">
                    <div className="col">
                        <div className="row">
                            <div className="col navbar-text" onClick={() => {
                                PageActions.showCustomerForm();
                            }}>Order form
                            </div>

                            <div className="col navbar-text" onClick={() => {
                                PageActions.showCustomerList();
                            }}>Order list
                            </div>
                        </div>
                    </div>
                </header>

                <p className="bg-primary text-center h3">Customer Orders</p>

                <div className="row">Enter your name:
                    <input type="text" onChange={(event) => {
                        this.state.customername = event.target.value;
                        this.setState({customername: this.state.customername})
                    }}/>
                </div>

                <button
                    onClick={() => {
                        OrderActions.listCustomerOrders(this.state.customername)
                    }}
                    className="btn btn-success">Fetch my orders
                </button>

                <table className="bg-light table-bordered table-hover text-black-50">
                    <tr>
                        <th>Address</th>
                        <th>Installation date</th>
                        <th>Price</th>
                        <th>Paid</th>
                        <th>Pay order</th>

                    </tr>
                    {this.state.orders.map((i) => {
                        return (
                            <tr>
                                <td>{i.address}</td>
                                <td>{i.installation.appointment}</td>
                                <td>{i.price}</td>
                                <td>{i.paid}</td>
                                <td className="customTd">
                                    <button
                                        onClick={() => {
                                            OrderActions.payOrder(i);
                                            OrderActions.listCustomerOrders(this.state.customername);
                                        }}
                                    >Pay</button>
                                </td>
                            </tr>);
                    })
                    }
                </table>
            </div>
        );
    }

}

export default CustomerOrderList;