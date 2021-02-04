import { Switch, Route, Redirect, RouteProps, useLocation } from 'react-router-dom';
import CreateAccount from '../../pages/CreateAccount';
import LogIn from '../../pages/LogIn';
import Home from '../../pages/Home';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import * as queryString from 'query-string';
import { resetManualLogOut } from '../../store/actions/auth-actions';
import { useEffect } from 'react';
import SellProduct from '../../pages/SellProduct';

const UnauthenticatedRoute: React.FC<RouteProps> = (props) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const location = useLocation();
  const dispatch = useDispatch();

  const query = queryString.parse(location.search);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(resetManualLogOut());
    }
  }, [isAuthenticated, dispatch]);

  if (!isAuthenticated) {
    return <Route {...props} />;
  }

  if (query.return_to) {
    window.location.href = query.return_to as string;
    return null;
  } else {
    return <Redirect to="/" />;
  }
};

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { isAuthenticated, manualLogOut } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const redirect = !manualLogOut && location.pathname !== '/' ? `/log-in?return_to=${window.location.href}` : '/log-in';

  if (isAuthenticated) {
    return <Route {...props} />;
  }

  return <Redirect to={redirect} />;
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
      <Route exact path="/">
        <Home />
      </Route>
      <PrivateRoute path="/sell-product">
        <SellProduct />
      </PrivateRoute>
    </Switch>
  );
};

export default Routes;
