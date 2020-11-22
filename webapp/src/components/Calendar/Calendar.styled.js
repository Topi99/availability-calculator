import styled from 'styled-components';

export const CalendarContainer = styled.article`
  width: 25%;
  height: 90%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: #1b1b1b;
  border-radius: 25px;
  box-shadow: 0 3px 5px #15151575;
  overflow-y: scroll;
`;

const getColor = (state) => {
  if (state === "available") {
    return "#335d33";
  } else if (state === "busy") {
    return "#501111";
  }
  return "#00000000";
}

export const CalendarSlot = styled.div`
  border-bottom: 1px solid #151515;
  padding: 10px;
  background-color: ${({state}) => getColor(state)}
`;
