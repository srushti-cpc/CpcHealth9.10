import React, { useState, useEffect } from 'react';
import '../style/cpchealth.css'; // Import CSS for the Header
import { Link } from 'react-router-dom';
import pluseicon from '../assets/iconplus.png';
import Docfind from '../assets/find.png';
import calender from '../assets/schedule.png';
import health from '../assets/social-services.png';
import axios from 'axios';



const CpcHealth = () => {

        const [insurances, setInsurances] = useState([]);
        const [selectedInsurance, setSelectedInsurance] = useState('');
        const [searchInput, setSearchInput] = useState('');
        const [locationInput, setLocationInput] = useState('');
      
        useEffect(() => {
          const fetchInsurances = async () => {
            try {
              const response = await axios.get('http://localhost:5000/api/insurance/list');
              setInsurances(response.data);
            } catch (error) {
              console.error('Error fetching insurance data', error);
            }
          };
      
          fetchInsurances();
        }, []);
      
        const handleInsuranceChange = (e) => {
          setSelectedInsurance(e.target.value);
        };
      
        const handleSearch = () => {
          // Implement search logic based on selectedInsurance, searchInput, and locationInput
          console.log('Searching with:', { selectedInsurance, searchInput, locationInput });
        };

    return (
        <>
            <header className="header">
                <a href="#home">
                    <img className="logo" alt="cpc logo" src="/cpclogo.jpeg" />
                </a>

                <nav className="main-nav">
                    <ul className="main-nav-list">
                        <li><Link className="main-nav-link nav-cta" to="/signup">Log in</Link></li>
                        <li><Link className="main-nav-link nav-cta" to="/signup">Sign up</Link></li>
                    </ul>
                </nav>

                <button className="btn-mobile-nav">
                    <ion-icon className="icon-mobile-nav" name="menu-outline"></ion-icon>
                    <ion-icon className="icon-mobile-nav" name="close-outline"></ion-icon>
                </button>
            </header>



            {/* how its works section*/}
            <h3>How its works</h3>
            <section className="centered-section">
                <div className="centered-content">
                    <div className="item">
                        <p id="rcorners2">
                            <img src={Docfind} alt="Docfind Avatar" />
                            <span>Search from an elite list of providers</span>
                        </p>
                    </div>
                    <img src={pluseicon} className="plusicon" alt="Plus Icon" />
                </div>
                <div className="centered-content">
                    <div className="item">
                        <p id="rcorners2">
                            <img src={calender} alt="calender Avatar" />
                            <span>Request an appoitment</span>
                        </p>
                    </div>
                    <img src={pluseicon} className="plusicon" alt="Plus Icon" />
                </div>
                <div className="centered-content">
                    <div className="item">
                        <p id="rcorners2">
                            <img src={health} alt="health Avatar" />
                            <span>Provider works directly with you for custom care</span>
                        </p>

                    </div>
                </div>
                {/* searchh barr */}

            </section>
            {/* <div class="searchcontainer">
                <div class="input-box">
                    <i class="uil uil-search"></i>
                    <input type="text" placeholder="Search here..." />
                    <button class="button">Search</button>
                </div>
            </div> */}

            {/* <div class="search-parent">
                <div class="searchcontainer">
                    <div class="input-box">
                        <div class="input-wrapper">
                            <i class="fas fa-search icon"></i>
                            <input type="text" placeholder="Condition,procedure,doctor..." class="input-field" />
                        </div>
                        <div class="input-wrapper">
                            <i class="fas fa-map-marker-alt icon"></i>
                            <input type="text" placeholder="City,state" class="input-field" />
                        </div>
                        <div class="input-wrapper">
                            <i class="fas fa-question-circle icon"></i>
                            <input type="text" placeholder="Choose Insurance" class="input-field" />
                        </div>
                        <button class="button">Search</button>
                    </div>
                </div>
            </div> */}
  <div className="search-parent">
      <div className="searchcontainer">
        <div className="input-box">
          <div className="input-wrapper">
            <i className="fas fa-search icon"></i>
            <input
              type="text"
              placeholder="Condition, procedure, doctor..."
              className="input-field"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <i className="fas fa-map-marker-alt icon"></i>
            <input
              type="text"
              placeholder="City, state"
              className="input-field"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <i className="fas fa-question-circle icon"></i>
            <select
              className="input-field"
              value={selectedInsurance}
              onChange={handleInsuranceChange}
            >
              <option value="">Choose Insurance</option>
              {insurances.map((insurance) => (
                <option key={insurance._id} value={insurance._id}>
                  {insurance.name}
                </option>
              ))}
            </select>
          </div>
          <button className="button" onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
        </>







    );
};

export default CpcHealth;
