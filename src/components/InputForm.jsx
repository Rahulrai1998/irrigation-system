import React, { useState } from 'react';

const InputForm = ({ onGenerate }) => {
  const [form, setForm] = useState({
    numPlots: 4,
    motors: 2,
    startTime: '060000',
    endTime: '190000',
    runtime: 5,
    interval: 20
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({
      ...form,
      numPlots: parseInt(form.numPlots),
      motors: parseInt(form.motors),
      runtime: parseInt(form.runtime),
      interval: parseInt(form.interval)
    });
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <label>Number of Plots:
        <input type="number" name="numPlots" value={form.numPlots} onChange={handleChange} />
      </label>
      <label>Motors in Parallel:
        <input type="number" name="motors" value={form.motors} onChange={handleChange} />
      </label>
      <label>Start Time (HHMMSS):
        <input type="text" name="startTime" value={form.startTime} onChange={handleChange} />
      </label>
      <label>End Time (HHMMSS):
        <input type="text" name="endTime" value={form.endTime} onChange={handleChange} />
      </label>
      <label>Motor Runtime (min):
        <input type="number" name="runtime" value={form.runtime} onChange={handleChange} />
      </label>
      <label>Cycle Interval (min):
        <input type="number" name="interval" value={form.interval} onChange={handleChange} />
      </label>
      <button type="submit">Generate Schedule</button>
    </form>
  );
};

export default InputForm;
