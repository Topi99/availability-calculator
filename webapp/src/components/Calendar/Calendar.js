import { useEffect, useMemo, useState } from 'react';
import { CalendarContainer, CalendarSlot } from './Calendar.styled';

/**
 * 
 * @typedef {object} Slot
 * @property {string} starts
 * @property {string} ends
 * @property {"available"|"busy"} state
 */

/**
 * Renders the calendar
 * @param {object} props
 * @param {[[string, string]]} props.busy 
 * @param {[[string, string]]} props.available
 * @param {string} props.starts 
 * @param {string} props.ends
 */
const Calendar = ({busy, available, starts, ends}) => {
  /**
   * @type {[[Slot], (slots: [Slot]) => void]} slots state
   */
  const [slots, setSlots] = useState([]);

  /**
   * Returns new slots
   * @param {string} starts 
   * @param {string} ends 
   * @return {[Slot]}
   */
  const getSlots = (starts, ends) => {
    let slots = [];

    return slots;
  }

  /**
   * Returns true if a given slot is available
   * @param {[[string, string]]} available 
   * @param {Slot} slot 
   * @param {string} starts 
   * @param {string} ends 
   * @return {boolean}
   */
  const isSlotAvailable = (available, slot, starts, ends) => {

  } 

  useEffect(() => {
    const computatedSlots = getSlots(starts, ends);
    computatedSlots.map(() => "");
  }, []);

  return (
    <CalendarContainer>
      {slots.map(slot => "")}
    </CalendarContainer>
  );
}

export default Calendar;
