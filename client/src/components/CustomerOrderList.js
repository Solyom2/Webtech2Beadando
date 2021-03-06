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

                <div className="col-sm-auto text-center p-1">Enter your name:
                    <input type="text" onChange={(event) => {
                        this.state.customername = event.target.value;
                        this.setState({customername: this.state.customername})
                    }}/>
                </div>

                <div className="col-sm-auto text-center p-1">
                    <button
                        onClick={() => {
                            OrderActions.listCustomerOrders(this.state.customername)
                        }}
                        className="btn btn-success">Fetch my orders
                    </button>
                </div>

                <div className="pt-2">
                    <table className="bg-light table-bordered table-hover text-black-50 m-auto">
                        <tr>
                            <th>Address</th>
                            <th>Installation date</th>
                            <th>Price</th>
                            <th>Paid</th>
                            <th>Pay order</th>
                        </tr>
                        {this.state.orders.map((i) => {

                            let paidTD;
                            if (i.paid === "No") {
                                paidTD = <td className="notPaidTd">
                                    <button
                                        onClick={() => {
                                            OrderActions.payOrder(i);
                                            OrderActions.listCustomerOrders(this.state.customername);
                                        }}
                                    >Pay</button>
                                </td>
                            } else {
                                paidTD = <td className="paidTd">Paid</td>
                            }

                            return (
                                <tr>
                                    <td>{i.address}</td>
                                    <td>{i.installation.appointment}</td>
                                    <td>{i.price}</td>
                                    <td>{i.paid}</td>
                                    {paidTD}
                                </tr>);
                        })
                        }
                    </table>
                </div>

            </div>
        );
    }

}

export default CustomerOrderList;