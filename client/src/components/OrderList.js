import React from "react"
import OrderActions from "../actions/OrderActions";
import OrderStore from "../store/OrderStore";

class OrderList extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = { orders : OrderStore._orders};
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
                <div className="col-12">
                    <ul className="list-group">
                        {this.state.orders.map((order)=>{
                            return(
                                <li
                                    key={order._id}
                                    className="list-group-item"
                                >{order["customername"]}</li>
                            );
                        })}
                    </ul>
                </div>
        );
    }

}

export default OrderList;