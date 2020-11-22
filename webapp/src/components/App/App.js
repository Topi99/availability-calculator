import { useState } from 'react';
import axios from 'axios';
import Calendar from '../Calendar';
import { AppContainer } from './App.styled';

const URL = "http://localhost:8080/api/availability"

const App = () => {
  const [calendar, setCalendar] = useState([]);
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
      <Calendar />
      <button onClick={() => getAvailability()}>Get</button>
    </AppContainer>
  );
}

export default App;
