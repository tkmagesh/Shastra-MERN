(function () {
  // sync
  function addSync(x, y) {
    console.log(`   [@service] processing ${x} and ${y}`);
    const result = x + y;
    console.log(`   [@service] returning result`);
    return result;
  }

  function addSyncClient(x, y) {
    console.log(`[@client] invoking the service`);
    const result = addSync(x, y);
    console.log(`[@client] result = ${result}`);
  }

  window['addSyncClient'] = addSyncClient;

  function addAsync(x, y, callbackFn) {
    console.log(`   [@service] processing ${x} and ${y}`);
    setTimeout(() => {
        const result = x + y;
        console.log(`   [@service] returning result`);
        callbackFn(result);    
    }, 4000);
  }

  function addAsyncClient(x, y) {
    console.log(`[@client] invoking the service`);
    addAsync(x, y, function(result){
        console.log(`[@client] result = ${result}`);
    });
    
  }

  window["addAsyncClient"] = addAsyncClient;

  function divideSync(x, y) {
    console.log(`   [@service] processing ${x} and ${y}`);
    if (y === 0){
        throw new Error('divisor cannot be zero')
    }
    const result = x / y;
    console.log(`   [@service] returning result`);
    return result;
  }

  function divideSyncClient(x, y) {
    try {
        console.log(`[@client] invoking the service`);
        const result = divideSync(x, y);
        console.log(`[@client] result = ${result}`);
    } catch (e){
        console.log('something went wrong :' , e)
    }
  }

  window["divideSyncClient"] = divideSyncClient;

  function divideAsync(x, y, callbackFn) {
    console.log(`   [@service] processing ${x} and ${y}`);
    setTimeout(() => {
        if (y === 0) {
          let e = new Error("divisor cannot be zero");
          callbackFn(e, null)
          return
        }
        const result = x / y;
        console.log(`   [@service] returning result`);
        callbackFn(null, result);    
    }, 4000);
    
  }

  function divideAsyncClient(x, y) {
   
      console.log(`[@client] invoking the service`);
      divideAsync(x, y, function(err, result){
        if (err) {
            console.log("somethig went wrong : ", err);
            return
        }
        console.log(`[@client] result = ${result}`);
      });
   
  }

  window["divideAsyncClient"] = divideAsyncClient;
})();