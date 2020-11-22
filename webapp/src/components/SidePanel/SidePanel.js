import { useSnackbar } from "notistack";
import { useState } from "react";
import { toString } from "../../util/hour";
import { Button, InputContainer, InputWrap, SidePanelContainer } from "./SidePanel.styled";

/**
 * 
 * @param {object} props
 * @param {[[string, string]]} props.busy
 */
const SidePanel = ({
  getAvailability,
  dayEnds,
  setDayEnds,
  dayStarts,
  setDayStarts,
  setBusy,
  busy,
}) => {
  const [newBusyHoursStarts, setNewBusyHoursStarts] = useState(dayStarts);
  const [newBusyMinutesStarts, setNewBusyMinutesStarts] = useState(0);
  const [newBusyHoursEnds, setNewBusyHoursEnds] = useState(dayStarts);
  const [newBusyMinutesEnds, setNewBusyMinutesEnds] = useState(15);
  const { enqueueSnackbar } = useSnackbar();

  const handleAdd = () => {
    console.log({newBusyHoursStarts, newBusyHoursEnds});
    const starts = newBusyHoursStarts + newBusyMinutesStarts / 60;
    const ends = newBusyHoursEnds + newBusyMinutesEnds / 60;
    const newSlot = [toString(starts), toString(ends)];

    if (starts >= ends) { 
      enqueueSnackbar("Invalid input", {
        variant: "error",
        autoHideDuration: 3000,
      });
      return;
    } else if (busy.filter((slot) => slot[0] === newSlot[0] && slot[1] === newSlot[1]).length > 0) { 
      enqueueSnackbar("Busy time already added", {
        variant: "error",
        autoHideDuration: 3000,
      });
      return;
    }

    const newBusy = [newSlot, ...busy].sort();
    setBusy(newBusy);
    enqueueSnackbar("New busy hours added", {
      variant: "success",
      autoHideDuration: 3000,
    });
  };

  return(
    <SidePanelContainer>
      {/* <p>Day starts:</p>
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
      <p>Day ends:</p>
      <InputContainer>
        <InputWrap>
          <label htmlFor="hours-input-day-starts">Hour</label>
          <input
            id="hours-input-day-starts"
            type="number"
            value={newBusyHoursStarts}
            min={dayStarts}
            max={dayEnds}
            step={1}
            onChange={(event) => setNewBusyHoursStarts(parseInt(event.target.value))}
          />
        </InputWrap>
        <InputWrap>
          <label htmlFor="minutes-input-day-starts">Minutes</label>
          <input
            id="minutes-input-day-starts"
            type="number"
            value={newBusyMinutesStarts}
            min={0}
            max={59}
            step={15}
            onChange={(event) => setNewBusyMinutesStarts(parseInt(event.target.value))}
          />
        </InputWrap>
      </InputContainer> */}
      <p>Busy time starts:</p>
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
      <p>Busy time ends:</p>
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
      <Button onClick={handleAdd}>Add new busy time</Button>
      <Button onClick={getAvailability}>Get Availability</Button>
    </SidePanelContainer>
  );
};

export default SidePanel;
