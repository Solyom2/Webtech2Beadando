import React from 'react';
import logo from './logo.svg';
import './css/style.css';
import OrderActions from "./actions/OrderActions";
import PageActions from "./actions/PageActions";


function App() {
  return (
    <div>
        <header className="-header navbar bg-secondary text-white text-center">
            <div className="col">
                <div className="row">
                    <div className="col navbar-text" onClick={() => {
                        PageActions.showCustomerPage();
                    }}>Customer page
                    </div>

                    <div className="col navbar-text" onClick={() => {
                        PageActions.showManagerPage();
                    }}>Manager page
                    </div>

                    <div className="col navbar-text" onClick={() => {
                        PageActions.showWorkerPage();
                    }}>Worker page
                    </div>
                </div>
            </div>
        </header>

        <div id="mainDiv">

            <div id="formDiv"></div>
            <div id="listDiv"></div>

        </div>

    </div>
  );
}

export default App;
