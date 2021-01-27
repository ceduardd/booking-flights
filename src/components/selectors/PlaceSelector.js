import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getSuggestions } from '../../helpers/getSuggestions';

import ErrorLabel from '../ErrorLabel';

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
      const suggestions = await getSuggestions(e.target.value);

      setResults([...suggestions]);
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
        <span>{label}:</span>
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
          <div className="selector__menu">
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
        <ErrorLabel>{errorMessage}</ErrorLabel>
      )}
    </div>
  );
};

export default PlaceSelector;
