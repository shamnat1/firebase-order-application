import React, { useContext } from "react";
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import SignIn from "../SignIn";
import Order from "../Order";
import ProfilePage from "../UserProfile";
import { UserContext } from "../../providers/UserProvider";
import OrderDetails from "../Order/OrderDetails";
function Application() {
    const user = useContext(UserContext);
    return (
        user ?
        <Router>
            <Switch>
                <Route exact path="/" component={ProfilePage} />
                <Route exact path="/orders" component={Order} />
                <Route exact path="/orders/:id" component={OrderDetails} />
            </Switch>
        </Router>
            :
            <Router>
                <SignIn path="/" />
            </Router>

    );
}

export default Application;
