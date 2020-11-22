import { useState } from 'react';
import axios from 'axios';
import Calendar from '../Calendar';
import SidePanel from '../SidePanel';
import { AppContainer } from './App.styled';
import { toString } from '../../util/hour';

const URL = "http://localhost:8080/api/availability"

const App = () => {
  const [busy, setBusy] = useState([]);
  const [available, setAvailable] = useState([]);
  const [dayStarts, setDayStarts] = useState(8.5);
  const [dayEnds, setDayEnds] = useState(18);

  const getAvailability = async () => {
    const body = {
      "day-starts": dayStarts,
      "day-ends": dayEnds,
      calendar: busy
    };
    const response = await axios.post(URL, body);
    setAvailable(response.data.available);
  }

  return (
    <AppContainer>
      <Calendar
        busy={busy}
        available={available}
        starts={toString(dayStarts)}
        ends={toString(dayEnds)}
        setBusy={setBusy}
      />
      <SidePanel
        getAvailability={getAvailability}
        setBusy={setBusy}
        busy={busy}
        dayStarts={parseInt(dayStarts)}
        dayEnds={parseInt(dayEnds)}
      >
      </SidePanel>
    </AppContainer>
  );
}

export default App;
