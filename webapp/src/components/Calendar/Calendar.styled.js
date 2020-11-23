import styled from 'styled-components';

export const CalendarContainer = styled.article`
  width: 70%;
  height: 90%;
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
};

export const CalendarSlot = styled.div`
  box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.25);
  padding: 10px;
  color: #464646;
  background-color: ${({state}) => getBgColor(state)};
  cursor: default;
  text-align: center;
`;
