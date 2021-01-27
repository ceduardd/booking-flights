import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const PlaceSelector = ({
  label,
  value,
  changeHandler,
  placeholder,
  menuInstruction,
  errorMessage,
}) => {
  const { errorFormat } = useSelector(state => state.ui);

  const [results, setResults] = useState([]);

  // Filter results of airports
  const filterHandler = async e => {
    changeHandler(e.target.value);

    if (e.target.value.trim().length > 2) {
      const { data } = await axios.get(
        `https://autocomplete.edestinos.com/?query=${e.target.value}&locale=en_US`
      );

      // Format payload
      const airports = data.result.filter(data => data._type === 'airport');

      const suggestions = airports.map(airport => ({
        code: airport._source.code,
        name: airport._source.suggestion,
        city: airport._source.cityName,
        country: airport._source.countryName,
      }));

      setResults(suggestions);
    }
  };

  // Set value on input
  const selectHandler = value => {
    changeHandler(value);

    setResults([]);
  };

  // Unselect dropdown list
  document.addEventListener(
    'click',
    e => {
      if (results.length !== 0) {
        setResults([]);
      }
    },
    false
  );

  return (
    <div className="selector__container">
      <label>
        {label}:
        <div style={{ marginTop: '5px' }} className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={e => filterHandler(e)}
          />
          <i className="fas fa-map-marker-alt"></i>
        </div>
        {results.length !== 0 && (
          <div className="selector__menu" aria-hidden={true}>
            <span className="selector__item selector__item-instruction">
              {menuInstruction}
            </span>
            {results.map(result => (
              <span
                key={result.code}
                onClick={() => selectHandler(`${result.city} - ${result.code}`)}
                className="selector__item"
              >
                {result.name}
              </span>
            ))}
          </div>
        )}
      </label>
      {errorFormat && errorFormat === errorMessage && (
        <div className="error-label">
          <i className="fas fa-exclamation-circle"></i> {errorMessage}
        </div>
      )}
    </div>
  );
};

export default PlaceSelector;
