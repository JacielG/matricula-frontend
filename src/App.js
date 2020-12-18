import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Header } from './components/header/header';
import { Container } from './components/container/container';
import { Login } from './containers/login/login';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Container />
      {/* <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/containers" component={Container} />
          <Route exact path="/" component={Login} />
        </Switch>
      </Router> */}
    </div>
  );
}

export default App;
