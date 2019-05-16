import React from "react"
import OrderActions from "../actions/OrderActions";
import PageActions from "../actions/PageActions";
import OrderStore from "../store/OrderStore";

class InstallationForm extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            order : OrderStore._selectedOrder,
            isChecked : false
        };
    }

    _onChange(){
        this.setState({});
    }

    componentDidMount(){
        OrderStore.addChangeListener(this._onChange)
    }

    componentWillUnmount(){
        OrderStore.removeChangeListener(this._onChange)
    }

    render() {
        return(
            <div className="container">

                <p className="bg-primary text-center h3">Installation form</p>

                <div className="row p-1 justify-content-center">Worker:
                    <input type="text" onChange={(event) => {
                        this.state.order.installation.worker = event.target.value;
                        this.setState({order: this.state.order})
                    }}/>
                </div>

                <div className="row p-1 justify-content-center">Date:
                    <input type="date" onChange={(event) => {
                        this.state.order.installation.appointment = event.target.value;
                        this.setState({order: this.state.order})
                    }}/>
                </div>

                <div className="row p-1 justify-content-center">Create invoice:
                    <input type="checkbox"
                           checked={this.state.isChecked}
                           onChange={() => {
                               this.setState({isChecked : !this.state.isChecked})
                           }}
                    />
                </div>

                <div className="row p-1 justify-content-center">
                    <button
                        onClick={() => {
                            console.log(this.state.order);
                            var installationObj = {
                                _id: this.state.order._id,
                                worker: this.state.order.installation.worker,
                                appointment: this.state.order.installation.appointment
                            };
                            console.log(installationObj);
                            console.log(this.state.isChecked);

                            OrderActions.arrangeInstallation(installationObj);
                            if(this.state.isChecked === true) {
                                OrderActions.createInvoice(installationObj._id);
                            }
                            PageActions.showManagerPage();
                        }}
                        className="btn btn-success">Organize installation
                    </button>
                </div>

            </div>
        );
    }

}

export default InstallationForm;