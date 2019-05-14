import PageConstants from "../constants/PageConstants";
import ShutterDispatcher from "../dispatcher/ShutterDispatcher";

class PageActions {

    showCustomerPage(){
        ShutterDispatcher.handleViewAction({
            actionType: PageConstants.SHOW_CUSTOMER_PAGE,
            payload : null
        });
    }

    showCustomerForm(){
        ShutterDispatcher.handleViewAction({
            actionType: PageConstants.SHOW_CUSTOMER_FORM,
            payload : null
        });
    }

    showWindowForm(){
        ShutterDispatcher.handleViewAction({
            actionType: PageConstants.SHOW_WINDOW_FORM,
            payload : null
        });
    }

    showCustomerList(){
        ShutterDispatcher.handleViewAction({
            actionType: PageConstants.SHOW_CUSTOMER_LIST,
            payload : null
        });
    }

    showManagerPage(){
        ShutterDispatcher.handleViewAction({
            actionType: PageConstants.SHOW_MANAGER_PAGE,
            payload : null
        });
    }

    showWorkerPage(){
        ShutterDispatcher.handleViewAction({
            actionType: PageConstants.SHOW_WORKER_PAGE,
            payload : null
        });
    }

}

export default new PageActions();