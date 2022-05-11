import { BrowserRouter as Switch, Route } from "react-router-dom";
import "./configureAmplify";

import Login from "./Login";
import Plans from "./Plans";
import Payment from "./Payment";

function App() {
  return (
    <div className="flex flex-col justify-center w-full max-w-xl m-auto h-screen">
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/payment">
          <Payment />
        </Route>
        <Route exact path="/plans">
          <Plans />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
