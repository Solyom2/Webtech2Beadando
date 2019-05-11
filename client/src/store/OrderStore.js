import {EventEmitter} from "events";

class OrderStore extends EventEmitter{

    _orders = [];
    _selectedParts = {
        _id: "",
        shuttertype: "",
        shuttercolor: "",
        quantity: null,
        parts: { shutterlength: null, shutterwidth: null, pulley: null }

    };

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