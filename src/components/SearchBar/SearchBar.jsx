export const SearchBar = ({ level, topic, onChange, onReset }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Topic filter"
        value={topic}
        onChange={evt => {
          onChange(evt.target.value, 'topic');
        }}
      />
      <select
        value={level}
        onChange={evt => {
          onChange(evt.target.value, 'level');
        }}
      >
        <option value="all">All</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
      {/* пока лоадинг кнопку прятать, изначально тоже прятать, пока у нас пустой
      массив */}
      <button onClick={onReset}>Reset filters</button>
    </div>
  );
};
