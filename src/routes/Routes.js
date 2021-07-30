import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import getForm from '../pages/getForm.jsx';
import home from '../pages/home.jsx';
import UpdateForm from '../pages/UpdateForm.jsx';

const Routes = () => {
    return (
        <Router>
        <NavBar/>
            <Switch>
                <Route exact path='/' component={home}/>
                <Route exact path='/getform' component={getForm}/>
                <Route exact path='/updateform/:id' component={UpdateForm}/>
            </Switch>
        </Router>
    )
}

export default Routes;