import OrderConstants from "../constants/OrderConstants";
import ShutterDispatcher from "../dispatcher/ShutterDispatcher";

class OrderActions {

    listOrders(){
        ShutterDispatcher.handleViewAction({
            actionType: OrderConstants.LIST_ORDERS,
            payload : null
        });
    }

    listUnfinishedOrders(){
        ShutterDispatcher.handleViewAction({
            actionType: OrderConstants.LIST_UNFINISHED_ORDERS,
            payload : null
        });
    }

    createOrder(order) {
        ShutterDispatcher.handleViewAction({
            actionType: OrderConstants.CREATE_ORDER,
            payload: order
        })
    }
    
}

export default new OrderActions();