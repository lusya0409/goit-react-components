export const SearchBar = ({
  level,
  topic,
  onChangeLevel,
  onChangeTopic,
  onReset,
}) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Topic filter"
        value={topic}
        onChange={evt => {
          console.dir(evt.target.value);

          onChangeTopic(evt.target.value);
        }}
      />
      <select
        value={level}
        onChange={evt => {
          console.dir(evt.target.value);
          onChangeLevel(evt.target.value);
        }}
      >
        <option value="all">All</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
      <button onClick={onReset}>Reset filters</button>
    </div>
  );
};
