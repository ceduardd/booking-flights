import { useRef, useState } from 'react';
import ClassIncon from './ClassIncon';

const ClassSelector = ({
  label,
  value,
  changeHandler,
  placeholder,
  menuInstruction,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Set value on input
  const selectHandler = value => {
    changeHandler(value);

    setIsOpen(false);
  };

  const menu = useRef(null);

  // Unselect dropdown list
  document.addEventListener(
    'click',
    e => {
      e.stopPropagation();

      if (e.target !== document.querySelector('.dropdown-indicator')) {
        setIsOpen(false);
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
            className="form-control disabled"
            type="text"
            placeholder={placeholder}
            disabled
            value={value}
            onChange={e => changeHandler(e.target.value)}
          />
          <ClassIncon />
          <i
            className="fas fa-chevron-down dropdown-indicator"
            onClick={() => setIsOpen(!isOpen)}
          ></i>
        </div>
      </label>
      {isOpen && (
        <div ref={menu} className="selector__menu" aria-hidden={true}>
          <span className="selector__item selector__item-instruction">
            {menuInstruction}
          </span>
          <span
            onClick={() => selectHandler('Economy')}
            className="selector__item"
          >
            Economy
          </span>
          <span
            onClick={() => selectHandler('Bussiness')}
            className="selector__item"
          >
            Bussiness
          </span>
          <span
            onClick={() => selectHandler('First')}
            className="selector__item"
          >
            First
          </span>
        </div>
      )}
    </div>
  );
};

export default ClassSelector;
