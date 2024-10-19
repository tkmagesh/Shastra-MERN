let StateManager = (function () {
  let _state = undefined,
    _subscription = undefined,
    _reducerFn = undefined,
    _init_action = { type : '@@INIT/ACTION' };

  function getState() {
    return _state;
  }

  function subscribe(listenerFn) {
    if (typeof listenerFn !== "function") {
      throw new Error("listenerFn is mandatory");
    }
    _subscription = listenerFn;
  }

  function dispatch(action) {
    let newState = _reducerFn(_state, action);
    if (newState == _state) return;
    _state = newState;
    if (typeof _subscription === 'function'){
        _subscription();
    }
  }

  function createStore(reducerFn) {
    if (typeof reducerFn !== 'function'){
        throw new Error('reducer function is mandatory to create the store');
    }
    _reducerFn = reducerFn;
    _state = _reducerFn(undefined, _init_action) // to initialize the currentState with a 'valid default' state
    return {
      getState: getState,
      subscribe: subscribe,
      dispatch: dispatch,
    };
  }
  return {
    createStore : createStore
  };

})();