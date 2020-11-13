import Login from './Login';
import Query from './Query';

function App() {
  return (
    <div className="centered">
      {localStorage.getItem('token') ? <Query />: <Login />}
    </div>
  );
}

export default App;
