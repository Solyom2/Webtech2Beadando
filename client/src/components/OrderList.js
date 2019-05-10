import React from "react"
import OrderActions from "../actions/OrderActions";
import OrderStore from "../store/OrderStore";

class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            orders : []
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
                <table className="bg-dark table-bordered table-hover text-white">
                    <tr>
                        <th>Customer name</th>
                        <th>Customer address</th>
                        <th>Price</th>
                    </tr>
                    {this.state.orders.map((i) => {
                        return (
                            <tr>
                                <td>{i.customername}</td>
                                <td>{i.address}</td>
                                <td>{i.price}</td>
                            </tr>);
                    })
                    }
                </table>
            </div>
        );
    }

}

export default OrderList;