import { useState } from "react";
import { Button, InputContainer, InputWrap, SidePanelContainer } from "./SidePanel.styled";

const SidePanel = ({getAvailability, dayEnds, dayStarts}) => {
  const [newBusyHoursStarts, setNewBusyHoursStarts] = useState(dayStarts);
  const [newBusyMinutesStarts, setNewBusyMinutesStarts] = useState(0);
  const [newBusyHoursEnds, setNewBusyHoursEnds] = useState(dayStarts);
  const [newBusyMinutesEnds, setNewBusyMinutesEnds] = useState(0);

  return(
    <SidePanelContainer>
      <p>Starts:</p>
      <InputContainer>
        <InputWrap>
          <label for="hours-input-starts">Hour</label>
          <input
            id="hours-input-starts"
            type="number"
            value={newBusyHoursStarts}
            min={dayStarts}
            max={dayEnds}
            step={1}
            onChange={(event) => setNewBusyHoursStarts(event.target.value)}
          />
        </InputWrap>
        <InputWrap>
          <label for="minutes-input-starts">Minutes</label>
          <input
            id="minutes-input-starts"
            type="number"
            value={newBusyMinutesStarts}
            min={0}
            max={59}
            step={15}
            onChange={(event) => setNewBusyMinutesStarts(event.target.value)}
          />
        </InputWrap>
      </InputContainer>
      <p>Ends:</p>
      <InputContainer>
        <InputWrap>
          <label for="hours-input-ends">Hour</label>
          <input
            id="hours-input-ends"
            type="number"
            value={newBusyHoursEnds}
            min={dayStarts}
            max={dayEnds}
            step={1}
            onChange={(event) => setNewBusyHoursEnds(event.target.value)}
          />
        </InputWrap>
        <InputWrap>
          <label for="minutes-input-ends">Minutes</label>
          <input
            id="minutes-input-ends"
            type="number"
            value={newBusyMinutesEnds}
            min={0}
            max={59}
            step={15}
            onChange={(event) => setNewBusyMinutesEnds(event.target.value)}
          />
        </InputWrap>
      </InputContainer>
      <Button onClick={() => getAvailability()}>Add new busy time</Button>
    </SidePanelContainer>
  );
};

export default SidePanel;
