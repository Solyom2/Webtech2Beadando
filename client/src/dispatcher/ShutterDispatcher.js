import {Dispatcher} from "flux";
import React from "react";
import ReactDOM from "react-dom";

import OrderConstants from "../constants/OrderConstants";
import PageConstants from "../constants/PageConstants";
import OrderStore from "../store/OrderStore";
import ManagerOrderList from "../components/ManagerOrderList";
import OrderForm from "../components/OrderForm";
import CustomerOrderList from "../components/CustomerOrderList";
import UnfinishedOrderList from "../components/UnfinishedOrderList";
import PartsList from "../components/PartsList";
import InstallationForm from "../components/InstallationForm";
import Statistics from "../components/Statistics";

class ShutterDispatcher extends Dispatcher{

    handleViewAction(action){
        this.dispatch({
            source : 'VIEW_ACTION',
            payload : action
        });
    }

}

const dispatcher = new ShutterDispatcher();

dispatcher.register((data) => {
    if (data.payload.actionType !== PageConstants.SHOW_CUSTOMER_PAGE) {
        return;
    }
    ReactDOM.render(
        React.createElement(CustomerOrderList),
        document.getElementById("listDiv")
    );

    ReactDOM.render(
        React.createElement(OrderForm),
        document.getElementById("formDiv")
    );
});

dispatcher.register((data) => {
    if (data.payload.actionType !== PageConstants.SHOW_MANAGER_PAGE) {
        return;
    }

    fetch('/manager/listAllOrder')
        .then((response) =>{return response.json()})
        .then((result)=>{
            for(var i = 0; i < result.length; i++) {
                if(result[i].paid == false) {
                    result[i].paid = "Nem";
                }
                else if(result[i].paid == true) {
                    result[i].paid = "Igen";
                }
            }

            OrderStore._orders = result;
            OrderStore.emitChange();
        })

    fetch('/manager/listReadyOrders')
        .then((response) =>{return response.json()})
        .then((result)=>{
            for(var i = 0; i < result.length; i++) {
                if(result[i].installation == undefined) {
                    var obj = {
                        worker: "Empty",
                        appointment: "Empty"
                    }
                    result[i].installation = obj;
                }
            }

            OrderStore._finishedOrders = result;
            OrderStore.emitChange();
        })

    ReactDOM.render(
        React.createElement(ManagerOrderList),
        document.getElementById("listDiv")
    );

    ReactDOM.render(
        React.createElement("div"),
        document.getElementById("formDiv")
    );
});

dispatcher.register((data) => {
    if (data.payload.actionType !== PageConstants.SHOW_WORKER_PAGE) {
        return;
    }

    fetch('/worker/listUnassembledOrders')
        .then((response) =>{return response.json()})
        .then((result)=>{
            OrderStore._orders = result;
            OrderStore.emitChange();
        })

    ReactDOM.render(
        React.createElement(UnfinishedOrderList),
        document.getElementById("listDiv")
    );

    ReactDOM.render(
        React.createElement("div"),
        document.getElementById("formDiv")
    );
});


dispatcher.register((data)=>{
    if(data.payload.actionType !== OrderConstants.LIST_ORDERS){
        return;
    }
    fetch('/manager/listAllOrder')
        .then((response) =>{return response.json()})
        .then((result)=>{
            OrderStore._orders = result;
            OrderStore.emitChange();
        })
});

dispatcher.register((data)=>{
    if(data.payload.actionType !== OrderConstants.LIST_CUSTOMER_ORDERS){
        return;
    }
    fetch('/customer/listOwnOrders?customername=' + data.payload.payload)
        .then((response) =>{return response.json()})
        .then((result)=>{
            if(result.errors) {
                result = [];
            }

            for(var i = 0; i < result.length; i++) {
                if(result[i].installation == undefined) {
                    var obj = {
                            worker: "Empty",
                            appointment: "Empty"
                        }
                    result[i].installation = obj;
                }
                if(result[i].paid == false) {
                    result[i].paid = "Nem";
                }
                else if(result[i].paid == true) {
                    result[i].paid = "Igen";
                }
            }

            OrderStore._orders = result;
            OrderStore.emitChange();
        })
});

dispatcher.register((data) => {
    if (data.payload.actionType !== OrderConstants.PAY_ORDER) {
        return;
    }
    console.log(JSON.stringify(data.payload.payload));
    fetch('/customer/payOrder', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data.payload.payload)
    })
});

dispatcher.register((data)=>{
    if(data.payload.actionType !== OrderConstants.LIST_UNFINISHED_ORDERS){
        return;
    }
    fetch('/worker/listUnassembledOrders')
        .then((response) =>{return response.json()})
        .then((result)=>{
            OrderStore._orders = result;
            OrderStore.emitChange();
        })
});

dispatcher.register((data)=>{
    if(data.payload.actionType !== OrderConstants.LIST_PARTS){
        return;
    }
    fetch('/worker/listParts?_id=' + data.payload.payload)
        .then((response) =>{return response.json()})
        .then((result)=>{
            OrderStore._selectedParts = result[0];
            OrderStore.emitChange();
        })

    ReactDOM.render(
        React.createElement(PartsList),
        document.getElementById("listDiv")
    );

    ReactDOM.render(
        React.createElement("div"),
        document.getElementById("formDiv")
    );
});

dispatcher.register((data) => {
    if (data.payload.actionType !== OrderConstants.ASSEMBLE_SHUTTER) {
        return;
    }
    console.log(JSON.stringify(data.payload.payload));
    fetch('/worker/assembleShutter', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data.payload.payload)
    })
});

dispatcher.register((data)=>{
    if(data.payload.actionType !== OrderConstants.SHOW_INSTALLATION_FORM){
        return;
    }
    OrderStore._selectedOrder = data.payload.payload;
    console.log(OrderStore._selectedOrder);
    OrderStore.emitChange();

    ReactDOM.render(
        React.createElement("div"),
        document.getElementById("listDiv")
    );

    ReactDOM.render(
        React.createElement(InstallationForm),
        document.getElementById("formDiv")
    );
});

dispatcher.register((data) => {
    if (data.payload.actionType !== OrderConstants.ARRANGE_INSTALLATION) {
        return;
    }
    console.log(JSON.stringify(data.payload.payload));
    fetch('/manager/arrangeInstallation', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data.payload.payload)
    })
});

dispatcher.register((data)=>{
    if(data.payload.actionType !== OrderConstants.CREATE_INVOICE) {
        return;
    }
    fetch('/manager/createInvoice?_id=' + data.payload.payload)
        .then((response) =>{return response.json()})
        .then((result)=>{

        })
});


dispatcher.register((data) => {
    if (data.payload.actionType !== OrderConstants.CREATE_ORDER) {
        return;
    }
    console.log(JSON.stringify(data.payload.payload));
    fetch('/customer/createOrder', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data.payload.payload)
    })
});

dispatcher.register((data)=>{
    if(data.payload.actionType !== OrderConstants.SHOW_STATISTICS){
        return;
    }
    fetch("/manager/checkStatistics")
        .then((response) =>{return response.json()})
        .then((result)=>{
            OrderStore._stats = result;
            OrderStore.emitChange();
        })

    ReactDOM.render(
        React.createElement(Statistics),
        document.getElementById("listDiv")
    );

    ReactDOM.render(
        React.createElement("div"),
        document.getElementById("formDiv")
    );
});

export default dispatcher;