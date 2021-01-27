const TravelerSelector = ({ label, value, changeHandler, icon: Icon, min }) => {
  return (
    <label className="traveler-selector">
      <span>{label}:</span>
      <div style={{ marginTop: '5px' }} className="form-group">
        <input
          className="form-control"
          type="number"
          value={value}
          onChange={e => changeHandler(e.target.value)}
          min={min}
        />
        <Icon />
      </div>
    </label>
  );
};

export default TravelerSelector;
