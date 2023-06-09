import './App.css';
import { useState} from "react";
import data from "./StatesJSON.json"

function App() {
  const [states, setStates] = useState([{id: "0", name: "Alabama", value: 1.15, image: "https://www.freeclipartnow.com/d/21816-7/alabama.jpg"}, {id: "1", name: "Alabama", value: 1.15, image: "https://www.freeclipartnow.com/d/21816-7/alabama.jpg"}]);

  const handleChange = (e, id) => {

    const newStates = [...states];

    const newVal = getVal(e.target.value);
    const newImg = getImage(e.target.value);

    if (id === "0") {
      newStates[0] = {id: "0", name: e.target.value, value: newVal, image: newImg};
      setStates(newStates);
    }
    else {
      newStates[1] = {id: "1", name: e.target.value, value: newVal, image: newImg};
      setStates(newStates);
    }
  }

  return (
    <div className="App">
      <div className="header">
          <h1 className="text-center">DollarDex</h1>
          <p className="text-center header-spacing subtitle-style">Calculate the value of money between states in America</p>
      </div>
      <div className='container box-container'>
        <div className='row justify-content-between'>
              {states.map((state) => {
            return <div className = 'col-lg-5'><InputBox name = {state.name} theChange = {handleChange} id = {state.id} img = {state.image} val = {state.value} /></div>
          })}
        </div>
        <div className="row calculator-spacing">
          <Calculator data = {states} />
        </div>
      </div>

    </div>

  );
}


function InputBox( {name, theChange, id, img, val} ) {

  return (
      <div className="container-fluid d-flex ">
          <div>
              <div className="form-group inp-box">
                  <div className="row">
                      <label className="text-center font-size dropdown-spacing">Choose a State!</label>
                      <select value={name} onChange={e => theChange(e, id)}>
                      {data.map(item => {
                          return <option key={item.name} className="text-center font-size">{item.name}</option>
                      })}
                      </select>
                  </div>

                  <div className="row">
                      <img src={img} className="stateImage" alt="Displayed state} "/>
                  </div>

                  <div className="row text-center">
                      <h2>$1 is equal to ${val} in {name}</h2>
                  </div>

              </div>
          </div>
      </div>
  );
}

function Calculator( {data} ) {
  const [input, setInput] = useState(0.00);
  const [formSubmitted, setFormSubmitted] = useState(false)
  
  let validInput = true;
  let output = `This is worth $${input} in ${data[1].name}`;

  function handleSubmit(e) {

    e.preventDefault();
    setInput(parseFloat(input).toFixed(2));
    if (isNaN(input)) {
      validInput = false;
    }
    if (!validInput) {
      setInput("This is not a valid input, please try again!");
    }
    else {
      setInput( parseFloat(input / data[0].value * data[1].value ).toFixed(2) );
    }
    setFormSubmitted(true);
  }


  return (
    <div className="container-fluid text-center calculator-background">
      <div className="row">
        <h2>Money Converter</h2>
      </div>
      <div className="row ">
        <div className='col-s'>
          <form onSubmit={e => handleSubmit(e)} >
            <label className="calculator-text">
              Enter an amount of money in {data[0].name}: $<input name="myInput" defaultValue="0.00" onChange={e => {setFormSubmitted(false); setInput(e.target.value)}} /> <button type="submit" >Submit</button>
            </label>
          </form>
        </div>
      </div>
      <div className='row'>
      <label className='output-text'>
        {formSubmitted ? output : ""} 
        </label>
      </div>
    </div>
  );
}

function getVal(name) {
  for (let i = 0; i < data.length; i++) {
      if (data[i].name === name) {
          return data[i].value;
      }
  }
}

function getImage(name) {
  for (let i = 0; i < data.length; i++) {
      if (data[i].name === name) {
          return data[i].image;
      }
  }
}


export default App;