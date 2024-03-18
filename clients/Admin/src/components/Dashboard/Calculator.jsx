import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
 import '../style.css'

const Calculator = () => {
  const [locationType, setLocationType] = useState('DEFAULT');
  const [selectedCountry, setSelectedCountry] = useState('United States of America');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Fetch countries when the component mounts
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleLocationTypeChange = (e) => {
    setLocationType(e.target.value);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <>

    <div className='out1'>
    <h2>Tax Calculator</h2>
        <div className='div1'>
         <form className='form1'>
            <h2 className='h11'>1 Address</h2>
        
          <h2>Ship From</h2>
          <div className="address-section">
            <label htmlFor="location">Location</label>
            <br />
            <select name="locationType" id="locationType" value={locationType} onChange={handleLocationTypeChange}>
              <option value="DEFAULT">DEFAULT</option>
              <option value="OTHERS">OTHERS</option>
            </select>
          </div>

          {locationType === 'DEFAULT' && (
            <div className="address-details">
              <p>ADDRESS</p>
              <p>185 Valley Dr</p>
              <p>Brisbane CA, US</p>
              <p>94005-1340</p>
            </div>
          )}

          {locationType === 'OTHERS' && (
            <div className="address-details">
              <h2>COUNTRY / TERRITORY</h2>
              <select name="country" id="country" value={selectedCountry} onChange={handleCountryChange}>
                {countries.map((country) => (
                  <option key={country.name.common} value={country.name.common}>
                    {country.name.common}
                  </option>
                ))}
              </select>
              <br />
              <label htmlFor="addressLine">ADDRESS</label>
              <br />
              <input type="text" id="addressLine" placeholder="Address line" />
              <br />
              <label htmlFor="addressLine">STATE / TERRITORY</label>
              <br />
              <input type="text" id="state" placeholder="state" />
              <br />
              <label htmlFor="addressLine">CITY</label>
              <br />
              <input type="text" id="city" placeholder="city" />
              <br />
              <label htmlFor="addressLine">ZIP/POSTAL CODE</label>
              <br />
              <input type="text" id="zip" placeholder="zip" />
              <br />
            </div>
          )}
          <h2>Ship to</h2>
          <div className="address-section">
            <label htmlFor="location">Location</label>
            <br />
            <select name="locationType" id="locationType" value={locationType} onChange={handleLocationTypeChange}>
              <option value="DEFAULT">DEFAULT</option>
              <option value="OTHERS">OTHERS</option>
            </select>
          </div>

          {locationType === 'DEFAULT' && (
            <div className="address-details">
              <p>ADDRESS</p>
              <p>185 Valley Dr</p>
              <p>Brisbane CA, US</p>
              <p>94005-1340</p>
            </div>
          )}

          {locationType === 'OTHERS' && (
            <div className="address-details">
              <h2>COUNTRY / TERRITORY</h2>
              <select name="country" id="country" value={selectedCountry} onChange={handleCountryChange}>
                {countries.map((country) => (
                  <option key={country.name.common} value={country.name.common}>
                    {country.name.common}
                  </option>
                ))}
              </select>
              <br />
              <label htmlFor="addressLine">ADDRESS</label>
              <br />
              <input type="text" id="addressLine" placeholder="Address line" />
              <br />
              <label htmlFor="addressLine">STATE / TERRITORY</label>
              <br />
              <input type="text" id="state" placeholder="state" />
              <br />
              <label htmlFor="addressLine">CITY</label>
              <br />
              <input type="text" id="city" placeholder="city" />
              <br />
              <label htmlFor="addressLine">ZIP/POSTAL CODE</label>
              <br />
              <input type="text" id="zip" placeholder="zip" />
              <br />
            </div>
          )}
          <div className="item-details-section">
            <button>Validates Address</button>
          </div> 
        </form><br />
        <h6 style={{paddingLeft:'50%'}}><button>Calculate</button>
         <button>Clear</button></h6>
        </div>
     
        <div className='div2'>
       <form className='form2'>
       <h2 className='h22'>2 Details</h2>
          <div style={{paddingLeft:'50px', paddingTop:'20px'}}><label htmlFor="addressLine">ITEM CODE</label>
            <br />
              <input type="text" id="city" placeholder="ITEM CODE" />
              <br />
             <label htmlFor="addressLine">QTY</label>
             <br />
              <input type="text" id="city" placeholder="QTY" />
              <br />
              <label htmlFor="addressLine">TOTAL AMOUNT</label>
              <br />
              <input type="text" id="city" placeholder="100.0" />
            </div><br />
            <div style={{textAlign:'center'}}>
            <label htmlFor="addressLine">TAX CODE</label>
              <br />
              <input type="text" id="city" placeholder="type a tax code" />
            </div><br />
            <div style={{width:'50%',float:'left',paddingLeft:'30px'}}>
            <label htmlFor="addressLine">CALCULATION TYPE</label> <br />
            <select style={{ width: '50%' }} name="tax" id="tax">
              <option value="sales">Sales Order</option>
              <option value="purchage">Purchage Order</option>
              <option value="return">Return Order</option>
              <option value="customer">Customer Order</option>
            </select>
             
            </div>
            <div style={{width:'50%',float:'right'}}>
            <label htmlFor="addressLine">Tax Date</label>
              <br />
              <input type="date" id="tax" name="tax"></input>
            </div><br />
            <div style={{paddingTop:'50px',paddingLeft:'20%'}}>
            <label htmlFor="addressLine">CUSTOMER / VENDOR CODE</label>
             <br />
              <input type="text" id="city" placeholder="code" />
            </div><br />
            <div style={{paddingLeft:'30px'}}>
            <label htmlFor="addressLine">ENTITY USE CODE</label> <br />
            <p>Choosing an exemption type enables AvaTax to
              determine exemption based on its tax rules
              </p>
            <select style={{ width: '70%' }} name="tax" id="tax">
              <option value="sales">Sales Order</option>
              <option value="purchage">Purchage Order</option>
              <option value="return">Return Order</option>
              <option value="customer">Customer Order</option>
            </select>
             
            </div><br />
            <div style={{paddingLeft:'30px'}}>
            </div>   
          </form>
          </div>
          
      </div>
      </>
  );
  
};

export default Calculator;