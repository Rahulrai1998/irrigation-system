import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import Filters from './components/Filters';
import ScheduleTable from './components/ScheduleTable';
import './index.css';
import { timeToMinutes, minutesToTime, getCurrentTimeInMinutes } from './utils/timeUtils';

const App = () => {
  const [schedule, setSchedule] = useState([]);
  const [filters, setFilters] = useState({ plot: 'all', status: 'all' });
  const [plots, setPlots] = useState([]);

  const generateSchedule = (config) => {
    const {
      numPlots,
      motors,
      startTime,
      endTime,
      runtime,
      interval
    } = config;

    const plotsList = Array.from({ length: numPlots }, (_, i) => `D${i + 1}`);
    setPlots(plotsList);

    let scheduleArr = [];
    let startMin = timeToMinutes(startTime);
    const endMin = timeToMinutes(endTime);

    let index = 0;

    while (startMin + runtime <= endMin) {
      for (let i = 0; i < numPlots; i += motors) {
        for (let m = 0; m < motors; m++) {
          const plotIndex = i + m;
          if (plotIndex >= numPlots) break;

          const sTime = minutesToTime(startMin);
          const eTime = minutesToTime(startMin + runtime);

          scheduleArr.push({
            index: index++,
            plot: plotsList[plotIndex],
            startTime: sTime,
            endTime: eTime,
            RunBy: `M${(m % motors) + 1}`
          });
        }
        startMin += runtime;
        if (startMin + runtime > endMin) break;
      }
      startMin += interval;
    }
    setSchedule(scheduleArr);
  };

  // Auto-refresh every minute for real-time status
  useEffect(() => {
    const interval = setInterval(() => setSchedule(s => [...s]), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1>Irrigation Scheduler</h1>
      <InputForm onGenerate={generateSchedule} />
      <Filters plots={plots} filters={filters} setFilters={setFilters} />
      <ScheduleTable schedule={schedule} filters={filters} />
    </div>
  );
};

export default App;
