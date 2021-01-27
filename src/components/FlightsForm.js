import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import FormTabs from './FormTabs';
import TypeFlightSelector from './selectors/TypeFlightSelector';
import PlaceSelector from './selectors/PlaceSelector';
import DateSelector from './selectors/DateSelector';
import ClassSelector from './selectors/ClassSelector';
import TravelerSelector from './selectors/TravelerSelector';
import ChildrenIcon from './icons/ChildrenIcon';
import InfantIcon from './icons/InfantIcon';
import AdultIcon from './icons/AdultIcon';
import ErrorLabel from './ErrorLabel';
import {
  removeErrorDate,
  removeErrorFormat,
  removeWrongDates,
  removeWrongPlaces,
  showErrorDate,
  showErrorFormat,
  showWrongDates,
  showWrongPlaces,
} from '../actions/uiActions';

// Initial travel dates
const now = moment().minutes(0).seconds(0).add(1, 'hours'); // 3:00:00
const nowPlus3 = now.clone().add(3, 'd');

const FlightsForm = () => {
  const dispatch = useDispatch();

  // Get realted inputs errors
  const { wrongDatesError, wrongPlacesError } = useSelector(state => state.ui);

  // Track inputs state
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [outboundDate, setOutboundDate] = useState(now.toDate());
  const [returnDate, setReturnDate] = useState(nowPlus3.toDate());
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [classFlight, setClassFlight] = useState('Economy');
  const [flightType, setFlightType] = useState('Round Trip');

  const clearErrors = () => {
    dispatch(removeErrorFormat());
    dispatch(removeErrorDate());
    dispatch(removeWrongDates());
    dispatch(removeWrongPlaces());
  };

  const submitHandler = e => {
    e.preventDefault();

    // Before new checking
    clearErrors();

    // Get places entries to check
    const from = origin.split(' ');
    const to = destination.split(' ');

    if (origin === destination) {
      dispatch(
        showWrongPlaces('The departure and arrival airports cannot be the same')
      );
    } else if (from.length <= 1) {
      dispatch(showErrorFormat('Select an available origin'));
    } else if (to.length <= 1) {
      dispatch(showErrorFormat('Select an available destination'));
    } else if (outboundDate <= moment.now()) {
      dispatch(showErrorDate('Outbound date is invalid'));
    } else if (returnDate <= moment.now()) {
      dispatch(showErrorDate('Return date is invalid'));
    } else if (returnDate < outboundDate) {
      dispatch(showWrongDates('Wrong dates order'));
    } else {
      const originCode = from[from.length - 1];
      const destinationCode = to[to.length - 1];

      // Build URI to deep linking
      const URI = `https://www.swiss.com/us/en/Book/Outbound/${originCode}-${destinationCode}/from-${moment(
        outboundDate
      ).format(
        'YYYY-MM-DD'
      )}/adults-${adults}/children-${children}/infants-${infants}/class-${classFlight.toLowerCase()}/al-LX/sidmbvl`;

      // Search with SWISS on new tab
      window.open(URI);
    }
  };

  return (
    <div className="home__form-container">
      <FormTabs />

      <form
        className="home__form-entries"
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <TypeFlightSelector value={flightType} changeHandler={setFlightType} />

        <div className="home__places">
          {wrongPlacesError && <ErrorLabel>{wrongPlacesError}</ErrorLabel>}

          <PlaceSelector
            label="From"
            value={origin}
            changeHandler={setOrigin}
            placeholder="Enter your origin"
            menuInstruction="Select an origin"
            errorMessage="Select an available origin"
          />

          <PlaceSelector
            label="To"
            value={destination}
            changeHandler={setDestination}
            placeholder="Enter your destination"
            menuInstruction="Select a destination"
            errorMessage="Select an available destination"
          />
        </div>

        <div className="home__form-dates">
          {wrongDatesError && <ErrorLabel>{wrongDatesError}</ErrorLabel>}

          <DateSelector
            label="Outbound"
            value={outboundDate}
            changeHandler={setOutboundDate}
            errorMessage="Outbound date is invalid"
          />

          {flightType !== 'One Way' && (
            <DateSelector
              label="Return"
              value={returnDate}
              changeHandler={setReturnDate}
              disabled={flightType !== 'Round Trip'}
              errorMessage="Return date is invalid"
            />
          )}
        </div>

        <ClassSelector
          label="Class"
          placeholder="Seleact a class flight"
          value={classFlight}
          changeHandler={setClassFlight}
          menuInstruction="Seleact a class flight"
        />

        <div className="home__form-travelers">
          <TravelerSelector
            label="Adutls"
            value={adults}
            changeHandler={setAdults}
            icon={AdultIcon}
            min={0}
          />
          <TravelerSelector
            label="Children"
            value={children}
            changeHandler={setChildren}
            icon={ChildrenIcon}
            min={0}
          />
          <TravelerSelector
            label="Infants"
            value={infants}
            changeHandler={setInfants}
            icon={InfantIcon}
            min={0}
          />
        </div>

        {/* Submit btn */}
        <button className="home__form-btn" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default FlightsForm;
