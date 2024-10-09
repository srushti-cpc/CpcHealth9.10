import React from 'react';
import '../style/headerdoc.css';
import { Link } from 'react-router-dom';

const HeaderDoc = () => {
  return (
    <header className="header">
      {/* <a href="#home">
        <img className="logo" alt="cpc logo" src="/cpclogo.jpeg" />
      </a> */}
      <nav className="main-nav">
        <div className="search-parent">
          <div className="searchcontainer">
            <div className="input-box">
              <div className="input-wrapper">
                <i className="fas fa-search icon"></i>
                <input
                  type="text"
                  placeholder="Condition, procedure, doctor..."
                  className="input-field"
                  // value={searchInput}
                  // onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <div className="input-wrapper">
                <i className="fas fa-map-marker-alt icon"></i>
                <input
                  type="text"
                  placeholder="City, state"
                  className="input-field"
                  // value={locationInput}
                  // onChange={(e) => setLocationInput(e.target.value)}
                />
              </div>
              <div className="input-wrapper">
                <i className="fas fa-question-circle icon"></i>
                <select
                  className="input-field"
                  // value={selectedInsurance}
                  // onChange={handleInsuranceChange}
                >
                  <option value="">Choose Insurance</option>
                  {/* {insurances.map((insurance) => (
                    <option key={insurance._id} value={insurance._id}>
                      {insurance.name}
                    </option>
                  ))} */}
                </select>
              </div>
              <button className="button">Search</button>
            </div>
          </div>
          <ul className="main-nav-list">
                        <li><Link className="main-nav-link nav-cta" to="/signup">Log in</Link></li>
                        <li><Link className="main-nav-link nav-cta" to="/signup">Sign up</Link></li>
                    </ul>
        </div>
  
      </nav>

    
    </header>
  );
};

export default HeaderDoc;
