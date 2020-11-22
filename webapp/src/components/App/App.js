import { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from '../Calendar';
import { AppContainer } from './App.styled';

const URL = "http://localhost:8080/api/availability"

const App = () => {
  const [busy, setBusy] = useState([]);
  const [available, setAvailable] = useState([]);
  const [dayStarts, setDayStarts] = useState("08:00");
  const [dayEnds, setDayEnds] = useState("18:00");

  const getAvailability = async () => {
    const response = await axios.post(URL, {
      "day-starts": dayStarts,
      "day-ends": dayEnds,
      calendar: busy
    });
    setAvailable(response.data.available);
  }

  return (
    <AppContainer>
      <Calendar
        busy={busy}
        available={available}
        starts={dayStarts}
        ends={dayEnds}
      />
      <button onClick={() => getAvailability()}>Get</button>
    </AppContainer>
  );
}

export default App;
