import React from "react"
import OrderActions from "../actions/OrderActions";
import OrderStore from "../store/OrderStore";

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

                <div className="row">Enter your name:
                    <input type="text" onChange={(event) => {
                        OrderStore._customername = event.target.value;
                        this.setState({customername: OrderStore._customername})
                    }}/>
                </div>

                <button
                    onClick={() => {
                        OrderActions.listCustomerOrders(this.state.customername)
                    }}
                    className="btn btn-success">Fetch my orders
                </button>

                <table className="bg-dark table-bordered table-hover text-white">
                    <tr>
                        <th>Address</th>
                        <th>Window length</th>
                        <th>Window width</th>
                        <th>Shutter type</th>
                        <th>Shutter color</th>
                        <th>Quantity</th>
                        <th>Installation date</th>
                        <th>Price</th>
                    </tr>
                    {this.state.orders.map((i) => {
                        return (
                            <tr>
                                <td>{i.address}</td>
                                <td>{i.windowlength}</td>
                                <td>{i.windowwidth}</td>
                                <td>{i.shuttertype}</td>
                                <td>{i.shuttercolor}</td>
                                <td>{i.quantity}</td>
                                <td>{i.installation.appointment}</td>
                                <td>{i.price}</td>
                            </tr>);
                    })
                    }
                </table>
            </div>
        );
    }

}

export default CustomerOrderList;