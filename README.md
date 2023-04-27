## 225. Module Introduction

What we will learn in this section??

1. What is redux and why should we use redux for our state management.
2. Redux basics and how will we use redux in react.
3. also we will learn about redux toolkit which is a better option for redux.

---

---

## 226. Another Look At State In React Apps

### Q: What is redux?

A: Redux is a state-management-system for cross-component or app-wide state .

### Q: What is Cross-component / App-wide state ?

A: Look state could be of three types

1. Local state.-->
   1. State that belongs to a single component.
   2. E.g. Listening to user input in an input feild; toggling a "show-more" details feild.
   3. Should be manageed inside of a component using useState() / useReducer()
2. Cross-component State.-->
   1. State that affects multiple components.
   2. E.g. open/ close the state of a modal overlay.
   3. Requires "prop chains" / "prop drilling" OR (reactcontext or reducer)
3. App-wide state.-->
   1. State that affects the entire app (most / all components).
   2. E.g. user authentecation status.
   3. Requires "prop chains" / "prop drilling" OR (reactcontext or reducer)

---

---

## 227. Redux vs React Context

### React context - potential disadvantages:

1. Complex Setup/ Management. (code below like this may be a result of using many react-context-providers in single app )

```js
return (
  <AuthContextProvider>
    <ThemeContextProvider>
      <UIInteractionContextProvider>
        <MultiStepFormContextProvider>
          <UserRegistration />
        </MultiStepFormContextProvider>
      </UIInteractionContextProvider>
    </ThemeContextProvider>
  </AuthContextProvider>
);
```

to avoid this you can have a large context provider with all the required state , but that could lead to a huge file with too much state to handle and may become confusing.
like this.

```js
function AllContextProvider(){
    const [isAuth,setIsAuth] = useState(false);
    const [isEvaluatingAuth,setIsEvaluatingAuth] = useState(false);
    const [activeTheme,setActiveTheme] = useState('default');
    const [...] = useState(...);

    function loginHandler(email,password){ ... };
    function signupHandler(email,password){ ... };
    function changeThemeHandler(newTheme){ ... };
...
return(
    <AllContext.Provider>
    {...}
    </AllContext.Provider>
)
}
```

2. Next problem is the performance :<br>
   <br>
   for the performance issue a react development team member "sebmarkbage" raised an issue that states:<br>
   <br>
   ""My personal summary is that new context is ready to be used for low frequency unlikely updates (like locale/theme). It's also good to use it in the same way as old context was used. I.e. for static values and then propagate updates through subscriptions. It's not ready to be used as a replacement for all Flux-like state propagation.""
   <br>
   therefore for enterprise level applications like HealthKart we cannot use ReactContext as it lags when high frequency changes occur.

Conclusion:

1. In more complex apps, managing React Context can lead to deeply nested JSX code and / or huge "Context Provider" Components.
2. React Context is not optimized for high frequency state changes.

---

## 228 : How Redux works

1. In redux you have only one data store , here data means state, this central state is accessible by all the components inside the application where ever it is needed.
2. All the components in an application where data is managed by redux share the subscriptio with the store due to which , whenever some data inside the store changes the component which is dependant on that data gets notified and may mutate accordingly.
3. For changing this state which we got from the store , One thing which is most imp to consider is that "components never ever change the redux store state directly".
4. For changing that redux store state we use the conncept of reducers (Reducer functions). This reducer function are responsible for the state mutations in the redux store. Here by saying reducer we dont mean the "useReducer()" hook , instead reducers are a general concept.
5. Reducers generally are functions which take an input and spit out a proccessed output .
6. For letting the store know that component needs to mutate/change a piece of store's state the component dispatches an action to the store for changing the state . And at the end the components receive the updated state .
7. and this dispatching is done through a dispatch function which takes the data to mutate the state and communicates to the store for the demand of changing that particular state.
8. the path of a state update using redux concepts is : components dispatch actions stating that what and how should update --> then this action reaches the reducer function . --> then inside the reducer function the main processing is done --> then lastly the state at the redux store gets updated --> and as a result which ever components are subscribed to this store's state gets the latest state immidiately.

---

---

## 229 : MUST READ: Redux createStore() is (not) deprecated

In the next lectures, you'll learn about Redux and how to use it. As part of these lectures a so-called Redux store will be created with help of a function called <strong style="color:yellow">.createStore()</strong>.

When using that function in your code, you might get a deprecation warning by your IDE or when running the app.

You should ignore this warning!

You can still use <strong style="color:yellow">.createStore()</strong> without issues.

Indeed, the React Redux team now recommends the usage of an extra package called Redux Toolkit and another way of creating the Redux store. That package will indeed be covered a little bit later in the course as well. But by first diving into <strong style="color:yellow">.createStore()</strong> and the next lectures, you'll learn how Redux works and what it does. This is some crucial knowledge that's required no matter if you're then using Redux Toolkit (as mentioned: Covered later as well) or not!

---

---

## 230 : Exploring The Core Redux Concepts.

1. It is not necessary to use redux along with react or any other js library , it could be used singlehandedly as redux is designed to handle data and app state.
2. For installing redux we need to run the below command :

```shell
npm install redux
```

3. Redux has a predefined function "redux.createStore()" which is used to initialize the store that redux manages for us and hence it is the main part of the whole application we generally start with store .
4. This createStore() function is responsible for setting the initial state of the application so that data starts to flow into the application and avoid null referrance error.
5. we also use some reducer functions to handle the actions and process the action types when they are called . these reducers recieve two parameters 1. the "old State" along with the action which we decide while calling the reducer func. And these reducer functions are automatically called by redux to manage the store state.
6. after processing the store state update procedure asper the action passed while invoking the reducer function these reducers spit-out new state object.
7. one thing to remember about the reducer function is that it must be a pure function which means it must not contain any side effects inside its body. E.g. you must not make a http api call , set some data into the local storage , you should not get any data to the local storage.
8. Reducer must only get the input provided by redux and return a new proccessed state object which is expected by redux. and nothing other than that.
9. <strong>"which in straightly mean for same input it must give same output "</strong>
10. simple counter reducer:

```js
// here we are assigning state parameter a default value when theres no value at the initial load
// att that time this {counter : 0} is defaultly passed to the counterReducer function.
const counterReducer = (state = { counter: 0 }, action) => {
  return {
    counter: state.counter + 1,
  };
};

// here we are using the redux.createStore() to make a store for managing the store state.
const store = redux.createStore(counterReducer);

const counterSubscriber = () => {
  const latestStore = store.getState(); // this gives the latest state snapshot when ever it is called using the store.
  console.log(latestStore);
};

store.subscribe(counterSubscriber); // here we are not calling the counterSubscriber function as it is handled by redux when ever redux needs that this counterSubscribe must be called.

// over here the type attrr in the dispatch function is  a unique identifier that differs all the action types for all listed ones.
store.dispatch({ type: "increment" });
```

---

---

## 231 : More redux basics

1. Typically when using redux the main goal is to do different things inside of the reducer for different actions ; and that's why we also get the action as a second parameter inside of our reducer function.
2. So in our example of the counter we can differentiate the actions of increment and decrement and can do things as per that , and the code is given below:

```js
// here we are assigning state parameter a default value when theres no value at the initial load
// att that time this {counter : 0} is defaultly passed to the counterReducer function.
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  } else if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }
};

// here we are using the redux.createStore() to make a store for managing the store state.
const store = redux.createStore(counterReducer);

const counterSubscriber = () => {
  const latestStore = store.getState(); // this gives the latest state snapshot when ever it is called using the store.
  console.log(latestStore);
};

store.subscribe(counterSubscriber); // here we are not calling the counterSubscriber function as it is handled by redux when ever redux needs that this counterSubscribe must be called.

// over here the type attrr in the dispatch function is  a unique identifier that differs all the action types for all listed ones.
store.dispatch({ type: "increment" });

// below here we are passing the action.type as decrement and this will decrease the state.counter value by 1.
store.dispatch({ type: "decrement" });
```

---

---

## 232 : Prepraing a new project

we installed redux for react using the below command

```shell
npm install redux react-redux
```

---

---

## 233 : Creating a Redux store for React

1. Created the store folder next to the components for creating the store and using redux.
2. Inside the store folder we have the index.js file inside the index.js we have the store defined with the counterReducer and the initial state and exported that store as a default export so that we can use that store elsewhere in our project.

code for the store :

```js
import { createStore } from "redux";

const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }
  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }
  return state;
};

const store = createStore(counterReducer);

export default store;
```

---

---

## 234 : Providing the store.

1. for accessing the store state we are required to provide our store to the components in which we are planning to use this state.
2. and also we can use this provider component anywhere inside the app and as many times as we like.
3. but keep in mind that only the wrapped components will receive the store state.
4. only after using the provider wrapper to wrap our app redux will not automatically know .
5. so for that we pass the store as a prop to the provider.

code:

```js
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

---

---

## 235 : using redux data in react component ;

1. For using the redux store's data we are supposed to use the useSelector() hook created by the react-redux team for to use the store data in our components.
2. For using the data from the store we can also use the useStore() hook by the react-redux team which gives u the whole store data once u call that store using this useStore() hook.
3. On the other hand the useSelector() is capable of returning only needed parts of the whole store which is benifitial for devs working with enterprise level projects where the store contains thousands of lines of code for managing data of user interaction and all .
4. I was unable to use the createStore function which is to be comming from the redux library but the issue was that i was trying to use that createStore function via importing it from the react-redux so thats why keep in mind that createStore is imported from the redux library and not from the react-redux.
5. changes this lines :

```js
import classes from "./Counter.module.css";
// used use selector from the react-redux lib
import { useSelector } from "react-redux";

const Counter = () => {
  // getting the counter value from the state and gettimg only specific value of counter.
  const counter = useSelector((state) => state.counter);

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {/* Using the counter value for displaying it inthe  UI */}
      <div className={classes.value}>{counter}</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
```

---

---

## 236 : Dispatching actions from inside components

1. Added two btns for increment and decrement for using the increment and decrement functionality inside the components.
2. added the onclick prop with two handlers which will dispatch action once clicked.
3. for dispatching actions to the redux store we must use the useDispatch hook provided by the react-redux lib.

code for usage of useDispatch hook:

```js
import classes from "./Counter.module.css";
import { useDispatch, useSelector } from "react-redux";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  const incrementHandler = () => {
    dispatch({ type: "increment" });
  };
  const decrementHandler = () => {
    dispatch({ type: "decrement" });
  };

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
```

---
---

## 237 : redux with class based Components 

### How to use the redux store inside a class-component.
function bases 
code:
```js
import classes from "./Counter.module.css";
import { useDispatch, useSelector, connect } from "react-redux";
import { Component } from "react";

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  const incrementHandler = () => {
    dispatch({ type: "increment" });
  };
  const decrementHandler = () => {
    dispatch({ type: "decrement" });
  };

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
```


class based
code:
```js
import classes from "./Counter.module.css";
import { connect } from "react-redux";
import { Component } from "react";
class Counter extends Component {
  incrementHandler() {
    this.props.increment();
  }
  decrementHandler() {
    this.props.decrement();
  }
  toggleCounterHandler() {}
  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        <div>
          <button onClick={this.incrementHandler.bind(this)}>Increment</button>
          <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
        </div>
        <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
      </main>
    );
  }
}

// we can use the connect HOC in both of the components class as well as function based component.

// Over here we are using the connect for wrapping the Counter component with the function which the connect function returns.
// the reason why we use the connect like this is that connect requires two arguments , to be precise it requires two arguments which are basically functions namely ->
// 1.

const mapStateToProps = (state) => {
  /**
   * -what it does is
   * it gets the state which is the redux state and then maps it to the component props
   * so that the store state  could be used inside the component usind the this.prop way.
   *
   */
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = (dispatch) => {
  /**
   * it is equivallent to useDispatch()
   * what it does is it maps the dispatch functions needed by the store to manipulate its state
   * to the components state and inside the component we can use those props to dispatch actions for the store state update.
   */
  return {
    increment: () => dispatch({ type: "increment" }),
    decrement: () => dispatch({ type: "decrement" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```
---
---

## 238 : Ataching paylods to actions

1. in this video we are using more complex actions to make more complex changes to the redux store this complex action object can include many attributes as per our needs 

e.g 

code 
```js
import { createStore } from "redux";
// import {createStore} from "redux"

const counterReducer=(state={counter:0},action)=>{
if(action.type==="increment"){
    return {
        counter:state.counter+1,
    }
}
if (action.type === "increase") {
  return {
    counter: state.counter + action.amount,
  };
}
if(action.type==="decrement"){
    return {
        counter:state.counter-1,
    }
}
return state ;
}

const store = createStore(counterReducer);

export default store;
```

Using that increase type :

```js

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);

  const incrementHandler = () => {
    dispatch({ type: "increment" });
  };
  const increaseHandler = () => {
    dispatch({ type: "increase", amount: 5 });
  };
  const decrementHandler = () => {
    dispatch({ type: "decrement" });
  };

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
        <button onClick={increaseHandler}>Increase by 5</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};
```

---
---

## 239 : Working with multiple state properties.

1. so basically what we did here is that for handling the toggle state for the counter we used the dispatch method and dispatched an action in which we are changing the showCounter redux state inverse of it which was previously present over there inside the redux store.

code:
```js
import { createStore } from "redux";
// import {createStore} from "redux"


const initState = { counter: 0, showCounter: true };
const counterReducer = (state = initState, action) => {
  if (action.type === "increment") {
    return {
      ...state,
      counter: state.counter + 1,
      //   showCounter: state.showCounter,
    };
  }
  if (action.type === "increase") {
    return {
      ...state,
      counter: state.counter + action.amount,
      //   showCounter: state.showCounter,
    };
  }
  if (action.type === "decrement") {
    return {
      ...state,
      counter: state.counter - 1,
      //   showCounter: state.showCounter,
    };
  }
  if (action.type === "toggle") {
    return {
      ...state,
      //   counter: state.counter,
      showCounter: !state.showCounter,
    };
  }
  return state;
};

const store = createStore(counterReducer);

export default store;
```

---
---

## 240 : How to work with redux state properly.

1. while working with redux state we must keep in mind that the reducer functions 
always replace/overwrite the previous state inside the store so we must handle each reducers store state update with precioson or else we will loose the  whole state.
2. <strong>we must never mutate the redux state directly inside a reducer</strong> like incrementing any value outside the return statement. we must always keep in mind that we are not mutating the state inside the body of the reducer function.
3. as objects and arrys are reference types in js everytime theres chance that we may accidentally change a previously stored state.
4. you could watch this video of maximillian explaining about objects and arrays being reference values in js.
https://academind.com/tutorials/reference-vs-primitive-values
5. for being on the safer side while updating redux state data we must always return a new state which can be derived from the previous state. Always copy and create new arrays and objects when ever needed.

---
---

## 241 : Redux challenges and introducing "redux toolkit"

1. the more complex our app gets, it gets more and more complex for us to manage redux state.
2. the above videos were about building the foundation for using redux and setting it up but from now on we will be doing a simpler setup for redux store using redux toolkit.
3. so the problems which we face while using redux for complex and bigger state of complex applications.
  1. the first issue is that we have types in our actions and if you accidentally misspell any of the action types then the redux reducer will not process that request of changing that state. it can be a problem once our application becomes bigger and has too many action types after which we could mistakenly call any other type which is simillar in spelling but not in functionality.
  2. Second big problem is that the amount of data we manage will directly increase the state object and which will inturn increase the reducer function as we have to consider the whole state while we update it.
  3. anoter problem is the <strong> state immutability </strong> as we have to keep in consideration that we always return a brand new state snapshot and not accidentally change the existing state. and if we change the existing state it will lead to bigger problems while making a scallable application.


---
---

## 242 : Adding State Slices

1. installed the package for reduxjs/toolkit with the below cmd 
```shell
npm install @reduxjs/toolkit 
```
2. You can now uninstall your redux once you had installed redux toolkit as redux is also included in the redux toolkit package already.
3. for using the redux toolkit we use the createSlice method which ships with the redux toolkit package.
code:
```js
// we need to store the returned value of createSlice function 
const counterSlice = createSlice({
  // the unique name of the slice as we can have as many slices as we want in an applications.
  name: "counter",
  // this below is the initial state which will be a blueprint for the further states.
  initialState:initState,
  // this is the object for the reducers which may contain as many reducers as we want.
  reducers: {
    // this is for incrementing the counter state.
    increment(state) {
      // over here we can use the state mutating logic
      // bacause redux toolkit used IMMER package to manage the state and avoid mutability  of the
      // current state but as a dev we get a pseudo feeling that we are mutating the state
      // but what ever state we mutate IMMER atlast also takes care of the current state
      // and handles the task of returning brand new state everytime we mutate any state.
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    // when ever we want some extra data as a param to the reducer function
    // we use the action param and redux toolkit passes that extra data
    // inside the action param.
    increase(state, action) {
      state.counter = state.counter + action.amount;
    },
    toggle(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

///////////////////////////////////////////////////////////////////////////////

// WITH REDUX
const counterReducer = (state = initState, action) => {
  if (action.type === "increment") {
    return {
      ...state,
      counter: state.counter + 1,
      //   showCounter: state.showCounter,
    };
  }
  if (action.type === "increase") {
    return {
      ...state,
      counter: state.counter + action.amount,
      //   showCounter: state.showCounter,
    };
  }
  if (action.type === "decrement") {
    return {
      ...state,
      counter: state.counter - 1,
      //   showCounter: state.showCounter,
    };
  }
  if (action.type === "toggle") {
    return {
      ...state,
      //   counter: state.counter,
      showCounter: !state.showCounter,
    };
  }
  return state;
};
```

---
---

## 243 : connecting redux toolkit state.

1. for connecting the redux toolkit state we first of all need to get the returned value from the createSlice() function like this.
```js
const counterSlice = createSlice({name... ,initialState... , reducers... })
```
2. after that we can use the counterSlice to pass our reducers to the createStore() function like.
```js
// in this counterSlice.reducers we get all of the reducers that we have defined while creating that slice.
const store = createStore(counterSlice.reducer);
```
3. but if we use the createStore() function from the redux lib we may end up with some issues when we are dealing with state . thats why we will be using the configureStore()  function (which comes with the redux-toolkit library.) for configuring our store.
it is versitile to handle multiple state Slices and in each slice we can have many reducer functions.
what configureStore() does is that it merges all the small small reducers of multiple slices to a bigger reducer and binds it with the store to be used this helps us to split our code between many files and keep out ligic simple to understand while we  config our state store
```js
// for single state slice
const store = configureStore({
  reducer: counterSlice.reducer,
});

// and for multiple state slices
const store = configureStore({
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});
```

## 244 : Migrating Everything to redux toolkit

1. for dispatching actions we have createSlice function which creates unique identifiers 
for each and every action method which we define inside the createSlice()'s  reducer's and therefore we are guaranteed that our actions will not clash into one another.
2.  ```js
      counterSlice.actions.toogle()
      // returns an action obj of this shape.
      {type: "some auto generated unique identifier"} 
      ``` 
3. these individual action obj generating unique identifier obj  when called are called action creators 
   which deal with action creation.
4.  we can use the ```export const counterActions = counterSlice.actions ``` to export all the action creators inside the counterSlice() and use those action creators inside our component files where we will be dispatching actions to change the redux state.
5.  for passing some extra data which we in redux call payload , we pass it between the opening and closing paranthesis of the action creator .
e.g
```js
  const increaseHandler = () => {
    dispatch(counterActions.increase(5)); // here if we need to pass some extra data to the action creator 
                                          // we pass it inside the calling paranthesis of the actions creator
                                          // {type:"auto generated unique identifier for increase", payload:5}
  };
```

---
---

## 245 : Wroking with multiple slices

1. for working with multiple state slices we pass the object form of the reducers to the configureStore function.
2. like this
```js 
const store = configureStore({
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});
```
3. once we use the multiple stateslices for our store we can now nolonger use the below syntax for extracting data from the redux toolkit store 
```js
  const counter = useSelector((state) => state.counter);
  const showCounter = useSelector((state) => state.showCounter);
```
4. now after using multiple stateSlices we will be required to use the below syntax for extracting state data.
```js
  const counter = useSelector((state) => state.counter.value);
  // in this state.counter.value the counter specifies that part/slice name from which we will be extracting the value state.
  const showCounter = useSelector((state) => state.counter.showCounter);
```
for bettter understanding watch the viseo of the course .

---
---

##  246 : Reading & Dispatching From A New Slice

1. included some code changes for conditional rendering :
```js
import { Fragment } from 'react';
import Auth from './components/Auth';
import Counter from './components/Counter';
import Header from './components/Header';
import { useSelector } from 'react-redux'; //new
import UserProfile from './components/UserProfile'; //new


function App() {
  const isAuth = useSelector(state=> state.auth.isAuthenticated) //new
  return (
    <Fragment>
      <Header />
      {!isAuth && <Auth/>} {/* new */}
      {isAuth && <UserProfile/>} {/* new */}
      <Counter />
    </Fragment>
  );
}

export default App;
```

2. added some more code to auth.js
```js
import classes from './Auth.module.css';
import { useDispatch } from 'react-redux'; // new
import { authActions } from '../store'; // new
const Auth = () => {
  const dispatch = useDispatch() //new
  const loginHandler = (event)=>{ //new
    event.preventDefault()        // new
    dispatch(authActions.login()) // new
  }
  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={loginHandler}> {/* new */}
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};
```

3. added new code to header .js for logout
```js
import classes from './Header.module.css';
import { useSelector,useDispatch } from 'react-redux'; // new
import { authActions } from '../store';// new

const Header = () => {
  const isAuth = useSelector(state=> state.auth.isAuthenticated) //new
  const dispatch = useDispatch(); //new

  const logoutHandler =()=>{   //new
    dispatch(authActions.logout())  //new
  }
  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {isAuth && <nav> {/* new */}
        <ul>
          <li>
            <a href='/'>My Products</a>
          </li>
          <li>
            <a href='/'>My Sales</a>
          </li>
          <li>
            <button onClick={logoutHandler}>Logout</button> {/* new */}
          </li>
        </ul>
      </nav>
      }
    </header>
  );
};

export default Header;
```

## 247. Splitting Our Code

Done code splitting to split all the store slices into individual files 


## 248 : summary 

got some summary

## 249 : Module Resources

Module Resources
You may want to compare your code to mine (e.g. to find + fix errors).

For that, you find multiple code snapshots for this module here in this Github repository: https://github.com/academind/react-complete-guide-code/tree/18-diving-into-redux

Usage instructions can be found on the page that link is leading to.

Simply pick one of the snapshots in the /code folder - the subfolder names are chosen such that they are easy to match against lecture names in this course section.