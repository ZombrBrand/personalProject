class Promise {
    constructor(){
        this.callbacks = []
        this.oncatch = null
    }

    then(onsuccess,onfail){
        this.callbacks.push({
            resolve:onsuccess,
            reject:onfail
        })
        return this
    }

    complete(type,result){
        if(type === 'reject' && this.oncatch){
            this.callbacks = []
            this.oncatch(result)
        }else if(this.callbacks[0]){
            var callbacksObj = this.callbacks.shift()
            if(callbacksObj) callbacksObj[type](result)
        }
    }

    resolve(result){
        this.complete('resolve',result)
    }

    reject(result){
        this.complete('reject',result)
    }

    catch(onfail){
        this.oncatch = onfail
    }
}

module.exports.Promise = Promise