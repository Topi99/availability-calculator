import { useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
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
  const { enqueueSnackbar } = useSnackbar();

  const getAvailability = async () => {
    const body = {
      "day-starts": toString(dayStarts),
      "day-ends": toString(dayEnds),
      calendar: busy
    };
    try {
      const response = await axios.post(URL, body);
      setAvailable(response.data.available);
      enqueueSnackbar("New availability", {
        variant: "success",
        autoHideDuration: 3000,
      });
    } catch (_) {
      enqueueSnackbar("Error while getting availability", {
        variant: "error",
        autoHideDuration: 3000,
      });
    }
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
