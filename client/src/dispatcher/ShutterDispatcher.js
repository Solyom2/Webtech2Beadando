import {Dispatcher} from "flux";
import React from "react";
import ReactDOM from "react-dom";

import OrderConstants from "../constants/OrderConstants";
import OrderStore from "../store/OrderStore";
import OrderList from "../components/OrderList";


class ShutterDispatcher extends Dispatcher{

    handleViewAction(action){
        this.dispatch({
            source : 'VIEW_ACTION',
            payload : action
        });
    }

}

const dispatcher = new ShutterDispatcher();

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

dispatcher.register((data) => {
    if (data.payload.actionType !== OrderConstants.CREATE_ORDER) {
        return;
    }
    console.log(data.payload.payload);
    console.log(JSON.stringify(data.payload.payload));
    fetch('/customer/createOrder', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data.payload.payload)
    })
});

export default dispatcher;