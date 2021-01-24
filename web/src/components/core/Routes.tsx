import { Switch, Route } from 'react-router-dom';
import CreateAccount from '../../pages/CreateAccount';
import Home from '../../pages/Home';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

const Routes = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Switch>
      {!isAuthenticated && (
        <Route path="/create-account">
          <CreateAccount />
        </Route>
      )}
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default Routes;
