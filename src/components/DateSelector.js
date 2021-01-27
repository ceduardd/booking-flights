import DatePicker from 'react-date-picker';
import { useSelector } from 'react-redux';
import DropdownIcon from './DropdownIcon';

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
      {label}:
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
        <div className="error-label">
          <i className="fas fa-exclamation-circle"></i> {errorMessage}
        </div>
      )}
    </label>
  );
};

export default DateSelector;
