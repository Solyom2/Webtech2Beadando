import {EventEmitter} from "events";

class OrderStore extends EventEmitter{

    _orders = [];
    _finishedOrders = [];
    _selectedOrder = {
        _id: "",
        customername: "",
        address: "",
        price: null,
        installation: { worker: null, appointment: null }
    };
    _selectedParts = {
        _id: "",
        parts: []
    };
    _submittedOrder = {
        order: {}
    };
    _stats = {
        submittedOrders: 0,
        totalPriceOfOrders: 0,
        requestedShutters : 0,
        assembledShutters: 0,
        averageQuantityPerOrder: 0,
        averagePricePerOrder: 0
    };
    _customername = "";

    emitChange(){
        this.emit('change')
    }

    addChangeListener(callback){
        this.on('change',callback);
    }

    removeChangeListener(callback){
        this.removeListener('change',callback);
    }

}

export default new OrderStore();