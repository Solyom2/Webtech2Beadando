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

export default dispatcher;