import { useState } from 'react';
import axios from 'axios';
import { AppContainer } from './App.styled';

const URL = "http://localhost:8080/api/availability"

const App = () => {
  const [calendar, setCalendar] = useState([["10:30", "11:30"]]);
  const [dayStarts, setDayStarts] = useState("08:00");
  const [dayEnds, setDayEnds] = useState("18:00");

  const getAvailability = async () => {
    const response = await axios.post(URL, {
      "day-starts": dayStarts,
      "day-ends": dayEnds,
      calendar: calendar
    })
    console.log(response);
  }

  return (
    <AppContainer>
      <button onClick={() => getAvailability()}>Get</button>
    </AppContainer>
  );
}

export default App;
