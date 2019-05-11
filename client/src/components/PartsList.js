import React from "react"
import OrderActions from "../actions/OrderActions";
import PageActions from "../actions/PageActions";
import OrderStore from "../store/OrderStore";

class PartsList extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            order : OrderStore._selectedParts
        };
    }

    _onChange(){
        this.setState({order : OrderStore._selectedParts});
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

                <table className="bg-dark table-bordered table-hover text-white">
                    <thead>
                    <tr>
                        <th>Quantity</th>
                        <th>Shutter type</th>
                        <th>Shutter color</th>
                        <th>Shutter length</th>
                        <th>Shutter width</th>
                        <th>Pulley</th>
                    </tr>
                    </thead>
                    <tr>
                        <td>{this.state.order.quantity}</td>
                        <td>{this.state.order.shuttertype}</td>
                        <td>{this.state.order.shuttercolor}</td>
                        <td>{this.state.order.parts.shutterlength}</td>
                        <td>{this.state.order.parts.shutterwidth}</td>
                        <td>{this.state.order.parts.pulley}</td>
                    </tr>
                </table>

                <div className="row">
                    <button className="btn btn-info"
                            onClick={() => {
                                OrderActions.assembleShutter(this.state.order);
                                PageActions.showWorkerPage();
                            }}>Assemble shutter
                    </button>
                </div>

            </div>
        )
    }

}

export default PartsList;