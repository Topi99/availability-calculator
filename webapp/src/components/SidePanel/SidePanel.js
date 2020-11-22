import { useSnackbar } from "notistack";
import { useState } from "react";
import { toString } from "../../util/hour";
import { Button, InputContainer, InputWrap, SidePanelContainer } from "./SidePanel.styled";

const SidePanel = ({getAvailability, dayEnds, dayStarts, setBusy, busy}) => {
  const [newBusyHoursStarts, setNewBusyHoursStarts] = useState(dayStarts);
  const [newBusyMinutesStarts, setNewBusyMinutesStarts] = useState(0);
  const [newBusyHoursEnds, setNewBusyHoursEnds] = useState(dayStarts);
  const [newBusyMinutesEnds, setNewBusyMinutesEnds] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  const handleGet = () => {
    console.log({newBusyHoursStarts, newBusyHoursEnds});
    const starts = newBusyHoursStarts + newBusyMinutesStarts / 60;
    const ends = newBusyHoursEnds + newBusyMinutesEnds / 60;
    console.log({starts, ends});

    if (starts >= ends) { 
      enqueueSnackbar("Horas ingresadas inválidas", {
        variant: "error",
        autoHideDuration: 3000,
      });
      return;
    }
    const newBusy = [[toString(starts), toString(ends)], ...busy].sort();
    setBusy(newBusy);
    getAvailability();
  };

  return(
    <SidePanelContainer>
      <p>Starts:</p>
      <InputContainer>
        <InputWrap>
          <label htmlFor="hours-input-starts">Hour</label>
          <input
            id="hours-input-starts"
            type="number"
            value={newBusyHoursStarts}
            min={dayStarts}
            max={dayEnds}
            step={1}
            onChange={(event) => setNewBusyHoursStarts(parseInt(event.target.value))}
          />
        </InputWrap>
        <InputWrap>
          <label htmlFor="minutes-input-starts">Minutes</label>
          <input
            id="minutes-input-starts"
            type="number"
            value={newBusyMinutesStarts}
            min={0}
            max={59}
            step={15}
            onChange={(event) => setNewBusyMinutesStarts(parseInt(event.target.value))}
          />
        </InputWrap>
      </InputContainer>
      <p>Ends:</p>
      <InputContainer>
        <InputWrap>
          <label htmlFor="hours-input-ends">Hour</label>
          <input
            id="hours-input-ends"
            type="number"
            value={newBusyHoursEnds}
            min={dayStarts}
            max={dayEnds}
            step={1}
            onChange={(event) => setNewBusyHoursEnds(parseInt(event.target.value))}
          />
        </InputWrap>
        <InputWrap>
          <label htmlFor="minutes-input-ends">Minutes</label>
          <input
            id="minutes-input-ends"
            type="number"
            value={newBusyMinutesEnds}
            min={0}
            max={59}
            step={15}
            onChange={(event) => setNewBusyMinutesEnds(parseInt(event.target.value))}
          />
        </InputWrap>
      </InputContainer>
      <Button onClick={handleGet}>Add new busy time</Button>
      <Button onClick={getAvailability}>Get Availability</Button>
    </SidePanelContainer>
  );
};

export default SidePanel;
