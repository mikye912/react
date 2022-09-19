import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from 'Views/Login/Login';
import Sub_main from 'Views/Main/Sub_main';
import { Provider } from "react-redux";
import store from "Common/Redux/store";
import { isBrowser, isMobile ,isIPad13} from 'react-device-detect';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route path="/main/*" element={
            <>
            {isBrowser ? 
              <Sub_main /> :
              "mobile"
            }
            </>
          } />
          <Route path="/*" element={<Sub_main />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
