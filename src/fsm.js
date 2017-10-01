class FSM { 
/** 
* Creates new FSM instance. 
* @param config 
*/ 
constructor(config) { 
    if (!config) { 
        throw new Error('Config doesn\'t provided!!!'); 
    } 

    this.initial = config.initial; 
    this.states = config.states; 

    this.reset(); 
} 

/** 
* Returns active state. 
* @returns {String} 
*/ 
getState() { 
    return this.history[this.currentState]; 
} 

/** 
* Goes to specified state. 
* @param state 
*/ 
changeState(state) { 
    if (!this.states[state]) { 
        throw new Error('The State doesn\'t exist!'); 
    } 

    this.history = this.history.slice(0, this.currentState + 1); 

    this.history.push(state); 
    this.currentState += 1; 
} 

/** 
* Changes state according to event transition rules. 
* @param transition 
*/ 
trigger(transition) { 
    const state = this.getState(); 
    const target = this.states[state].transitions[transition]; 

    if (!target) { 
        throw new Error('Transition doesn\'t exist!'); 
    } 

    this.changeState(target); 
} 

/** 
* Resets FSM state to initial. 
*/ 
reset() { 
    this.history = [this.initial]; 
    this.currentState = 0; 
} 

/** 
* Returns an array of states for which there are specified event transition rules. 
* Returns all states if argument is undefined. 
* @param transition 
* @returns {Array} 
*/ 
getStates(transition) { 
    if (!transition) { 
    return this.getAllStates(); 
} 

    return this.getStateByTransition(transition); 
} 

/** 
* Goes back to previous state. 
* Returns false if undo is not available. 
* @returns {Boolean} 
*/ 
undo() { 
    if (!this.currentState) { 
    return false; 
    } 

    this.currentState -= 1; 
    return true; 
} 

/** 
* Goes redo to state. 
* Returns false if redo is not available. 
* @returns {Boolean} 
*/ 
redo() { 
    if (this.pointerOnTheLastElement()) { 
    return false; 
    } 

    this.currentState += 1; 
    return true; 
} 

/** 
* Clears transition history 
*/ 
clearHistory() { 
    this.reset(); 
} 

getAllStates() { 
    return Object.keys(this.states); 
} 

getStateByTransition(transition) { 
    return Object.keys(this.states) 
    .filter(state => this.states[state].transitions[transition]) 
} 

/* 
* Super description 
* @returns {Boolean} 
* */ 
pointerOnTheLastElement() { 
    return this.currentState === this.history.length - 1; 
} 
} 

module.exports = FSM; 
