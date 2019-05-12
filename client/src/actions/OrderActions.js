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

    payOrder(id){
        ShutterDispatcher.handleViewAction({
            actionType: OrderConstants.PAY_ORDER,
            payload : id
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

    createInvoice(id) {
        ShutterDispatcher.handleViewAction({
            actionType: OrderConstants.CREATE_INVOICE,
            payload : id
        });
    }

    createOrder(order) {
        ShutterDispatcher.handleViewAction({
            actionType: OrderConstants.CREATE_ORDER,
            payload: order
        })
    }

    showStatistics(){
        ShutterDispatcher.handleViewAction({
            actionType: OrderConstants.SHOW_STATISTICS,
            payload : null
        });
    }
    
}

export default new OrderActions();