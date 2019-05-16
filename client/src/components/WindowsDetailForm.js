import React from "react"
import OrderActions from "../actions/OrderActions";
import OrderStore from "../store/OrderStore";
import PageActions from "../actions/PageActions";

class WindowsDetailForm extends React.Component{

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
        this.state = {
            windowlength: null,
            windowwidth: null,
            shuttertype: null,
            shuttercolor: null,
            quantity: null
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

                <header className="-header navbar bg-light text-black-50 text-center">
                    <div className="col">
                        <div className="row">
                            <div className="col navbar-text" onClick={() => {
                                PageActions.showCustomerForm();
                            }}>Order form
                            </div>

                            <div className="col navbar-text" onClick={() => {
                                PageActions.showCustomerList();
                            }}>Order list
                            </div>
                        </div>
                    </div>
                </header>

                <p className="bg-primary text-center h3">Windows details</p>

                <p className="bg-info text-center font-italic h4">Number of orders: {OrderStore._submittedOrder.order.windows.length}</p>

                <form id="windowform">
                <div className="row p-1 justify-content-center">Window height:
                    <input type="number" onChange={(event) => {
                        this.state.windowlength = event.target.value;
                        this.setState({windowlength: this.state.windowlength})
                    }}/>
                </div>

                <div className="row p-1 justify-content-center">Window width:
                    <input type="number" onChange={(event) => {
                        this.state.windowwidth = event.target.value;
                        this.setState({windowwidth: this.state.windowwidth})
                    }}/>
                </div>

                <div className="row p-1 justify-content-center">Shutter type:
                    <input type="text" onChange={(event) => {
                        this.state.shuttertype = event.target.value;
                        this.setState({shuttertype: this.state.shuttertype})
                    }}/>
                </div>

                <div className="row p-1 justify-content-center">Shutter color:
                    <input type="text" required="true"  onChange={(event) => {
                        this.state.shuttercolor = event.target.value;
                        this.setState({shuttercolor: this.state.shuttercolor})
                    }}/>
                </div>

                <div className="row p-1 justify-content-center">Quantity:
                    <input type="number" onChange={(event) => {
                        this.state.quantity = event.target.value;
                        this.setState({quantity: this.state.quantity});

                    }}/>
                </div>
                </form>
                
                <div className="row justify-content-center p-1">
                    <div className="col-2">
                        <button
                            onClick={() => {
                                console.log(this.state);
                                OrderStore._submittedOrder.order.windows.push(this.state);
                                this.setState({windowlength: null,
                                    windowwidth: null,
                                    shuttertype: null,
                                    shuttercolor: null,
                                    quantity: null})
                                document.getElementById("windowform").reset();
                            }}
                            className="btn-info">Add window
                        </button>
                    </div>

                    <div className="col-2">
                        <button
                            onClick={() => {
                                OrderActions.createOrder(OrderStore._submittedOrder);
                                PageActions.showCustomerForm();
                            }}
                            className="btn btn-success">Submit order
                        </button>
                    </div>
                </div>
                
            </div>
        );
    }


}

export default WindowsDetailForm;