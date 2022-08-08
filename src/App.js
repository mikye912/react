import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from './components/index';
import Sub_main from './components/sub_main';
import { Provider } from "react-redux";
import store from "./common/redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sub_main/*" element={<Sub_main />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
