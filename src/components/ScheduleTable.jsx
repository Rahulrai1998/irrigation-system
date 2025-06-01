import React from 'react';
import { timeToMinutes, getCurrentTimeInMinutes } from '../utils/timeUtils';

const ScheduleTable = ({ schedule, filters }) => {
  const now = getCurrentTimeInMinutes();

  const getStatus = (start, end) => {
    const s = timeToMinutes(start);
    const e = timeToMinutes(end);
    if (now > e) return 'done';
    if (now >= s && now <= e) return 'in-progress';
    return 'pending';
  };

  const filteredSchedule = schedule.filter(entry => {
    const status = getStatus(entry.startTime, entry.endTime);
    return (
      (filters.plot === 'all' || entry.plot === filters.plot) &&
      (filters.status === 'all' || status === filters.status)
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Index</th>
          <th>Plot</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Run By</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {filteredSchedule.map(entry => {
          const status = getStatus(entry.startTime, entry.endTime);
          return (
            <tr key={entry.index} className={status.replace(' ', '-')}>
              <td>{entry.index}</td>
              <td>{entry.plot}</td>
              <td>{entry.startTime}</td>
              <td>{entry.endTime}</td>
              <td>{entry.RunBy}</td>
              <td>{status}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ScheduleTable;
