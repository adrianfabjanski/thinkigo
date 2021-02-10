import "./App.css";
import Container from "./components/Container/Container";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Register from "./components/Login/Register";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route path="/board/:id" component={Container} />
                    <Route path="/register" component={Register} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
