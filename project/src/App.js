import logo from './logo.svg';
import './App.css';
import './my.css';
import Admin from './components/admin.component';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import User from './components/user.component';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Route exact path="/">
            <Admin/> 
            <User/>
          </Route>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
