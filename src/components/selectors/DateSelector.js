import DatePicker from 'react-date-picker';
import { useSelector } from 'react-redux';
import DropdownIcon from '../icons/DropdownIcon';
import ErrorLabel from '../ErrorLabel';

const DateSelector = ({
  label,
  value,
  changeHandler,
  disabled,
  errorMessage,
}) => {
  const { errorDate } = useSelector(state => state.ui);

  return (
    <label className="date-selector" htmlFor="from">
      <span>{label}:</span>
      <div style={{ marginTop: '5px' }} className="form-group">
        <DatePicker
          value={value}
          onChange={changeHandler}
          clearIcon={null}
          calendarIcon={<DropdownIcon />}
          disabled={disabled}
        />
        <i className="far fa-calendar"></i>
      </div>
      {errorDate && errorDate === errorMessage && (
        <ErrorLabel>{errorMessage}</ErrorLabel>
      )}
    </label>
  );
};

export default DateSelector;
