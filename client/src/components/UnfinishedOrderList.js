import React from "react"
import OrderActions from "../actions/OrderActions";
import OrderStore from "../store/OrderStore";

class UnfinishedOrderList extends React.Component {

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

                <p className="bg-primary text-center h3">Orders to be completed</p>

                <table className="bg-light table-bordered table-hover text-black-50">
                    <tr>
                        <th>Order ID</th>
                        <th>Customer name</th>
                        <th>Customer address</th>
                    </tr>
                    {this.state.orders.map((i) => {
                        return (
                            <tr onClick={() => {
                                OrderActions.listParts(i._id)
                            }}>
                                <td>{i._id}</td>
                                <td>{i.customername}</td>
                                <td>{i.address}</td>
                            </tr>);
                    })
                    }

                </table>
            </div>
        );
    }

}

export default UnfinishedOrderList;