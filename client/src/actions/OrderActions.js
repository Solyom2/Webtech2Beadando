import OrderConstants from "../constants/OrderConstants";
import ShutterDispatcher from "../dispatcher/ShutterDispatcher";

class OrderActions {

    listOrders(){
        ShutterDispatcher.handleViewAction({
            actionType: OrderConstants.LIST_ORDERS,
            payload : null
        });
    }

}

export default new OrderActions();