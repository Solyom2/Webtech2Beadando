import React from "react"
import OrderActions from "../actions/OrderActions";
import PageActions from "../actions/PageActions";
import OrderStore from "../store/OrderStore";

class CustomerDetailForm extends React.Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
          
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

    //TODO innen továbblépni a WindiowsDetailForm-ra
    render() {
        return(
            <div className="container">

                <header className="-header navbar bg-light text-black-50 text-center">
                    <div className="col">
                        <div className="row">
                            <div className="col navbar-text" onClick={() => {
                                PageActions.showCustomerForm();
                            }}>Order form
                            </div>

                            <div className="col navbar-text" onClick={() => {
                                //PageActions.showManagerPage();
                            }}>Order list
                            </div>
                        </div>
                    </div>
                </header>
                
                <p className="bg-primary text-center h3">Shutter order form</p>

                <div className="row">Customer name
                    <input type="text" onChange={(event) => {
                        OrderStore._submittedOrder.order.customername = event.target.value;
                        //this.setState({order: this.state.order})
                    }}/>
                </div>

                <div className="row">Address
                    <input type="text" onChange={(event) => {
                        OrderStore._submittedOrder.order.customername = event.target.value;
                        //this.setState({order: this.state.order})
                    }}/>
                </div>

                <button
                    onClick={() => {

                    }}
                    className="btn btn-success">Continue
                </button>

            </div>
        );
    }
    
}

export default CustomerDetailForm;