import ReactDOM from 'react-dom';
import App from './App';
import 'focus-visible/dist/focus-visible';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
