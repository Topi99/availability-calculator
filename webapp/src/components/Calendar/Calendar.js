import { useCallback, useEffect, useState } from 'react';
import { toDecimal, toString } from '../../util/hour';
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
const Calendar = ({busy, available, starts, ends, setBusy}) => {
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
    let isAvailable = false;
    console.log("ent")
    available.forEach((element) => {
      if (slot.starts >= element[0] && slot.starts < element[1]) {
        isAvailable = true;
        return;
      }
    });
    return isAvailable;
  };

  useEffect(() => {
    const computatedSlots = getSlots(starts, ends);
    if (available[0]) {
      console.log("enters");
      const slotsWithAvailability = computatedSlots.map(slot => ({
        state: isSlotAvailable(available, slot, starts, ends)
          ? "available"
          : "busy",
        starts: slot.starts,
        ends: slot.ends,
      }));
      console.log(slotsWithAvailability);
      setSlots(slotsWithAvailability);
      return;
    }
    console.log("pases");
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
