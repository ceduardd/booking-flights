const TypeFlightSelector = ({ value, changeHandler }) => {
  return (
    <div className="home__form-flight-type">
      <label
        className={`home__form-radio-btn ${
          value === 'One Way' ? 'active' : 'not-active'
        }`}
        htmlFor="oneWay"
      >
        One Way
        <input
          name="flightType"
          id="oneWay"
          type="radio"
          value="One Way"
          checked={value === 'One Way'}
          onChange={e => changeHandler(e.target.value)}
        />
      </label>
      <label
        className={`home__form-radio-btn ${
          value === 'Round Trip' ? 'active' : 'not-active'
        }`}
        htmlFor="roundTrip"
      >
        Round Trip
        <input
          name="flightType"
          id="roundTrip"
          type="radio"
          value="Round Trip"
          checked={value === 'Round Trip'}
          onChange={e => changeHandler(e.target.value)}
        />
      </label>
    </div>
  );
};

export default TypeFlightSelector;
