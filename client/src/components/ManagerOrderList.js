import React from "react"
import OrderActions from "../actions/OrderActions";
import OrderStore from "../store/OrderStore";

class ManagerOrderList extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            orders : [],
            finishedOrders : []
        };
    }

    _onChange(){
        this.setState({orders : OrderStore._orders,
                             finishedOrders : OrderStore._finishedOrders
        });
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

                <div>Every order</div>
                <div>
                    <table className="bg-dark table-bordered table-hover text-white">
                        <tr>
                            <th>Order ID</th>
                            <th>Customer name</th>
                            <th>Customer address</th>
                            <th>Price</th>
                            <th>Paid</th>
                        </tr>
                        {this.state.orders.map((i) => {
                            return (
                                <tr>
                                    <td>{i._id}</td>
                                    <td>{i.customername}</td>
                                    <td>{i.address}</td>
                                    <td>{i.price}</td>
                                    <td>{i.paid}</td>
                                </tr>);
                        })
                        }
                    </table>
                </div>

                <div>Assembled orders</div>
                <div>
                    <table className="bg-dark table-bordered table-hover text-white">
                        <tr>
                            <th>Order ID</th>
                            <th>Customer name</th>
                            <th>Customer address</th>
                            <th>Worker</th>
                            <th>Installation appointment</th>
                            <th>Price</th>
                            <th>Organize installation</th>
                        </tr>
                        {this.state.finishedOrders.map((i) => {
                            return (
                                <tr>
                                    <td>{i._id}</td>
                                    <td>{i.customername}</td>
                                    <td>{i.address}</td>
                                    <td>{i.installation.worker}</td>
                                    <td>{i.installation.appointment}</td>
                                    <td>{i.price}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                OrderActions.showInstallationForm(i)
                                            }}
                                        >Organize</button>
                                    </td>
                                </tr>);
                        })
                        }
                    </table>
                </div>

                <div>Check statistics</div>
                <button
                    onClick={() => {
                        OrderActions.showStatistics();
                    }}
                >Check</button>
            </div>
        );
    }

}

export default ManagerOrderList;