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

                <p className="bg-primary text-center h3">Every order</p>
                <div className="pb-2">
                    <table className="bg-light table-bordered table-hover text-black-50 m-auto">
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
                                    <td className="idTd">{i._id}</td>
                                    <td>{i.customername}</td>
                                    <td>{i.address}</td>
                                    <td>{i.price}</td>
                                    <td>{i.paid}</td>
                                </tr>);
                        })
                        }
                    </table>
                </div>

                <p className="bg-primary text-center h3">Assembled orders</p>
                <div className="pb-2">
                    <table className="bg-light table-bordered table-hover text-black-50 m-auto">
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
                                    <td className="idTd">{i._id}</td>
                                    <td>{i.customername}</td>
                                    <td>{i.address}</td>
                                    <td>{i.installation.worker}</td>
                                    <td>{i.installation.appointment}</td>
                                    <td>{i.price}</td>
                                    <td className="text-center">
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

                <p className="bg-primary text-center h3">Check Statistics</p>
                <div className="col-sm-12 text-center">
                        <button className="btn-info"
                            onClick={() => {
                                OrderActions.showStatistics();
                            }}
                        >Check</button>
                </div>


            </div>
        );
    }

}

export default ManagerOrderList;