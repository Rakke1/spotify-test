import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import useAuth from './hooks/useAuth';

const state = new URLSearchParams(window.location.search).get("state");
const code = new URLSearchParams(window.location.search).get("code");

function App() {
  const accessToken = useAuth(code, state);

  return (
    accessToken ? <Dashboard accessToken={accessToken} /> : <Login />
  );
}

export default App;
