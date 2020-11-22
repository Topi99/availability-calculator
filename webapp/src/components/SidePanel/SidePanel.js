import { useState } from "react";
import { Button, InputContainer, InputWrap, SidePanelContainer } from "./SidePanel.styled";

const SidePanel = ({getAvailability, dayEnds, dayStarts}) => {
  const [newBusyHours, setNewBusyHours] = useState(dayStarts);
  const [newBusyMinutes, setNewBusyMinutes] = useState(0);

  return(
    <SidePanelContainer>
      <InputContainer>
        <InputWrap>
          <label for="hours-input">Hour</label>
          <input
            id="hours-input"
            type="number"
            value={newBusyHours}
            min={dayStarts}
            max={dayEnds}
            step={1}
            onChange={(event) => setNewBusyHours(event.target.value)}
          />
        </InputWrap>
        <InputWrap>
          <label for="minutes-input">Minutes</label>
          <input
            id="minutes-input"
            type="number"
            value={newBusyMinutes}
            min={0}
            max={59}
            step={15}
            onChange={(event) => setNewBusyMinutes(event.target.value)}
          />
        </InputWrap>
      </InputContainer>
      <Button onClick={() => getAvailability()}>Add new busy time</Button>
    </SidePanelContainer>
  );
};

export default SidePanel;
