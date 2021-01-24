import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import CreateAccount from '../../pages/CreateAccount';
import LogIn from '../../pages/LogIn';
import Home from '../../pages/Home';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

const UnauthenticatedRoute: React.FC<RouteProps> = (props) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Route {...props} />;
  }

  return <Redirect to="/" />;
};

const Routes = () => {
  return (
    <Switch>
      <UnauthenticatedRoute path="/create-account">
        <CreateAccount />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute path="/log-in">
        <LogIn />
      </UnauthenticatedRoute>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default Routes;
