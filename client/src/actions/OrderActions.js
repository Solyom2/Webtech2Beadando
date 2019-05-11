import OrderConstants from "../constants/OrderConstants";
import ShutterDispatcher from "../dispatcher/ShutterDispatcher";

class OrderActions {

    listOrders(){
        ShutterDispatcher.handleViewAction({
            actionType: OrderConstants.LIST_ORDERS,
            payload : null
        });
    }

    listCustomerOrders(customername){
        ShutterDispatcher.handleViewAction({
            actionType: OrderConstants.LIST_CUSTOMER_ORDERS,
            payload : customername
        });
    }

    listUnfinishedOrders(){
        ShutterDispatcher.handleViewAction({
            actionType: OrderConstants.LIST_UNFINISHED_ORDERS,
            payload : null
        });
    }

    listParts(id){
        ShutterDispatcher.handleViewAction({
            actionType: OrderConstants.LIST_PARTS,
            payload : id
        });
    }

    assembleShutter(order){
        ShutterDispatcher.handleViewAction({
            actionType: OrderConstants.ASSEMBLE_SHUTTER,
            payload : order
        });
    }

    showInstallationForm(order) {
        ShutterDispatcher.handleViewAction({
            actionType: OrderConstants.SHOW_INSTALLATION_FORM,
            payload: order
        })
    }

    arrangeInstallation(installation) {
        ShutterDispatcher.handleViewAction({
            actionType: OrderConstants.ARRANGE_INSTALLATION,
            payload: installation
        })
    }

    createOrder(order) {
        ShutterDispatcher.handleViewAction({
            actionType: OrderConstants.CREATE_ORDER,
            payload: order
        })
    }
    
}

export default new OrderActions();