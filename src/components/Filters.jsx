import React from 'react';

const Filters = ({ plots, filters, setFilters }) => {
  return (
    <div className="filters">
      <label>Filter by Plot:
        <select
          value={filters.plot}
          onChange={e => setFilters(f => ({ ...f, plot: e.target.value }))}
        >
          <option value="all">All</option>
          {plots.map(plot => (
            <option key={plot} value={plot}>{plot}</option>
          ))}
        </select>
      </label>
      <label>Filter by Status:
        <select
          value={filters.status}
          onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
        >
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="in-progress">In Progress</option>
          <option value="pending">Pending</option>
        </select>
      </label>
    </div>
  );
};

export default Filters;
