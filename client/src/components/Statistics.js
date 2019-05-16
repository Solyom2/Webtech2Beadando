import React from "react"
import OrderActions from "../actions/OrderActions";
import OrderStore from "../store/OrderStore";
import PageActions from "../actions/PageActions";

class Statistics extends React.Component{

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            stats : OrderStore._stats
        };
    }

    _onChange(){
        this.setState({stats : OrderStore._stats});
    }

    componentDidMount(){
        OrderStore.addChangeListener(this._onChange)
    }

    componentWillUnmount(){
        OrderStore.removeChangeListener(this._onChange)
    }

    render() {
        return (
            <div className="container container-fluid">

                <p className="bg-primary text-center h3">Statistics</p>
                <div>
                    <table className="bg-light table-bordered table-hover text-black-50 text-center m-auto">
                        <thead>
                        <tr>
                            <th>Submitted orders</th>
                            <th>Total price of orders</th>
                            <th>Requested shutters</th>
                            <th>Assembled shutters</th>
                            <th>Average quantity per order</th>
                            <th>Average price per order</th>
                        </tr>
                        </thead>
                        <tr>
                            <td>{this.state.stats.submittedOrders}</td>
                            <td>{this.state.stats.totalPriceOfOrders}</td>
                            <td>{this.state.stats.requestedShutters}</td>
                            <td>{this.state.stats.assembledShutters}</td>
                            <td>{this.state.stats.averageQuantityPerOrder}</td>
                            <td>{this.state.stats.averagePricePerOrder}</td>
                        </tr>
                    </table>
                </div>

            </div>
        )
    }

}

export default Statistics;