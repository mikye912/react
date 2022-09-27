import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from 'Views/Login/Login';
import Sub_main from 'Views/Main/Sub_main';
import { Provider } from "react-redux";
import store from "Common/Redux/store";
import Mobile from 'Views/Login/Mobile';

const App = ( { isBrowser } ) => {

  const device = sessionStorage.getItem("device");
  console.log(isBrowser)
console.log(device)
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={ 
            <>
            {
            (isBrowser == true && device == null) || (isBrowser == true && device == "PC") || (isBrowser == false && device == "PC") ? 
            <Login /> : 
            <Mobile />
            }
            </>
          } />
          <Route path="/main/*" element={<Sub_main />
            // <>
            // {device == "PC" ? 
            //   <Sub_main /> :
            //   "mobile"
            // }
            // </>
          } />
          <Route path="/*" element={<Sub_main />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
