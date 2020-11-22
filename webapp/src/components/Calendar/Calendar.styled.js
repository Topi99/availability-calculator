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
  background-color: #f6fdff;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1),
              0 0px 3px rgba(0, 0, 0, 0.07);
  overflow-y: scroll;
`;

const getBgColor = (state) => {
  if (state === "available") {
    return "#b7f7b7";
  } else if (state === "busy") {
    return "#fd6d6d";
  }
  return "#00000000";
}

export const CalendarSlot = styled.div`
  border-bottom: 1px solid #e2e2e2;
  padding: 10px;
  color: #464646;
  background-color: ${({state}) => getBgColor(state)};
  cursor: default;
`;
