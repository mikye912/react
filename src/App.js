import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './views/login/Login';
import Sub_main from './views/main/Sub_main';
import { Provider } from "react-redux";
import store from "./common/redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sub_main/*" element={<Sub_main />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
