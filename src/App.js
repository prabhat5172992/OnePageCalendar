import { useState } from 'react';
import Calender from "./onePageCalander";
import "./App.css";

function App() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [currentDate, setCurrentDate] = useState(new Date().toDateString().split(" "));

  const getYear = (e) => {
    const y = e.target.value || new Date().getFullYear();
    const d = new Date().toDateString().split(" ");
    const regEx = /^[1-9]\d*$/;
    if(y && y.toString().length === 4 && regEx.test(y)){
      setYear(y);
      d.splice(3,1,y.toString());
    } else {
      setYear(new Date().getFullYear());
    }
    setCurrentDate(new Date(d).toDateString().split(" "));
  }

  return (
    <div className="App">
      <input type="number" placeholder="Enter year.." className="input_year" onChange={(e)=>getYear(e)} />
      <Calender userYear={year} currentDate={currentDate} />
    </div>
  );
}

export default App;
