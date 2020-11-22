import { useCallback, useEffect, useState } from 'react';
import { CalendarContainer, CalendarSlot } from './Calendar.styled';

/**
 * 
 * @typedef {object} Slot
 * @property {string} starts
 * @property {string} ends
 * @property {"available"|"busy"|undefined} state
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
   * Parses an hour in HH:MM format to decimal.
   * @param {string} hour with HH:MM format
   */
  const toDecimal = (hour) => {
    const [hours, minutes] = hour.split(":");
    return parseInt(hours) + parseInt(minutes) / 60;
  };

  /**
   * Parses an hour from decimal to HH:MM format.
   * @param {number} hour 
   * @returns {string} Hour in HH:MM format
   */
  const toString = (hour) => {
    const hours = parseInt(hour);
    const minutes = hour - hours;
    return `${("0" + hours).slice(-2)}:${("0" + minutes * 60).slice(-2)}`
  };

  /**
   * Returns new slots
   * @param {string} starts 
   * @param {string} ends 
   * @return {[Slot]}
   */
  const getSlots = useCallback((starts, ends) => {
    /** @type {[Slot]} */
    const slots = [];
    let startsDec = toDecimal(starts);
    const endsDec = toDecimal(ends);

    const increment = 0.25; // 15 minutes in decimal
    
    while (startsDec < endsDec) {
      slots.push({
        starts: toString(startsDec),
        ends: toString(startsDec + increment),
        state: undefined,
      });
      startsDec += increment;
    }

    return slots;
  }, [])

  /**
   * Returns true if a given slot is available
   * @param {[[string, string]]} available 
   * @param {Slot} slot 
   * @param {string} starts 
   * @param {string} ends 
   * @return {boolean}
   */
  const isSlotAvailable = (available, slot, starts, ends) => {

  };

  useEffect(() => {
    const computatedSlots = getSlots(starts, ends);
    if (available[0]) {
      console.log("enters");
      const slotsWithAvailability = computatedSlots.map(slot => ({
        state: isSlotAvailable(available, slot, starts, ends)
          ? "available"
          : "busy",
        ...slot,
      }));
      setSlots(slotsWithAvailability);
      return;
    }
    setSlots(computatedSlots);
  }, [available, starts, ends, getSlots]);

  return (
    <CalendarContainer>
      {slots.map((slot, index) => (
        <CalendarSlot state={slot.state} key={index}>
          {`${slot.starts} - ${slot.ends}`}
        </CalendarSlot>)
      )}
    </CalendarContainer>
  );
}

export default Calendar;
