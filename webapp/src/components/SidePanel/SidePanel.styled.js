import styled from 'styled-components';

export const SidePanelContainer = styled.section`
  width: 70%;
  background-color: #f6fdff;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1),
              0 0px 3px rgba(0, 0, 0, 0.07);
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 15px;
  box-sizing: border-box;
`;

export const Button = styled.button`
  background-color: #c6e5ff;
  border-radius: 5px;
  border: 1px solid #80b2dc;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  padding: 7px;
  margin: 5px 0;
  color: ${({color}) => color ? color : "#0057a0"};
`;

export const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
`;

export const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 20px 0;

  input {
    border: 1px solid rgb(170, 170, 170);
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 1rem;
    box-sizing: border-box;
  }

  label {
    padding: 5px 0;
  }
`;
