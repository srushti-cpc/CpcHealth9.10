import Vision from './client/component/Vision';
import Header from './client/component/Header';
import Purpose from './client/component/Purpose';
import Video from './client/component/Video';
import Footer from './client/component/Footer';
import Solution from './client/component/Solution';
import NicheMarket from './client/component/NicheMarket';
import './App.css';
import Auth from './client/component/Auth.js'
import CpcHealth from './client/component/CpcHealth.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchDoc from './client/component/SearchDoc.js';

const App = () => {
  return (
    <Router>
    <div className="App">
      {/* <Auth/> */}
      <Routes>
          <Route path="/" element={<>
            <Header/>
            <Vision />
            <Purpose />
            <NicheMarket />
            <Video />
            <Solution />
            <Footer />
          </>} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/cleanplatehealth" element={<CpcHealth />} />
          <Route path="/searchDoctor" element={<SearchDoc />} />



        </Routes>
    </div>
    </Router>
  );
};
export default App;



