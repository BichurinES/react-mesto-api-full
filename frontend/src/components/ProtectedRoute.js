import { Redirect, Route } from 'react-router-dom';

function ProtectedRoute(props) {
  return (
    <Route path={props.path}>
      {props.isLogged ? props.children : <Redirect to="/sign-in" />}
    </Route>
  );
}

export default ProtectedRoute;