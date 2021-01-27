import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import PlaceSelector from './PlaceSelector';
import DateSelector from './DateSelector';
import TravelerSelector from './TravelerSelector';
import ChildrenIcon from './ChildrenIcon';
import InfantIcon from './InfantIcon';
import AdultIcon from './AdultIcon';
import ClassSelector from './ClassSelector';
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

    if (origin === destination) {
      dispatch(
        showWrongPlaces('The departure and arrival airports cannot be the same')
      );
      console.log('yey');
    } else if (from.length <= 1) {
      dispatch(showErrorFormat('Select an available origin'));
    } else if (to.length <= 1) {
      dispatch(showErrorFormat('Select an available destination'));
    } else if (outboundDate <= moment.now()) {
      dispatch(showErrorDate('Outbound date is invalid'));
    } else if (returnDate <= moment.now()) {
      dispatch(showErrorDate('Return date is invalid'));
    } else if (returnDate < outboundDate) {
      dispatch(showWrongDates('Wrong dates'));
    } else {
      const from = origin.split(' ');
      const to = destination.split(' ');

      const originCode = from[from.length - 1];
      const destinationCode = to[to.length - 1];

      // Build URI
      const uri = `https://www.swiss.com/us/en/Book/Outbound/${originCode}-${destinationCode}/from-${moment(
        outboundDate
      ).format(
        'YYYY-MM-DD'
      )}/adults-${adults}/children-${children}/infants-${infants}/class-${classFlight.toLowerCase()}/al-LX/sidmbvl`;

      // Search with SWISS on new tab
      window.open(uri);
    }
  };

  return (
    <main className="home__container">
      <div className="home__form-container">
        {/* Tabs */}
        <div className="home__form-tabs">
          <button className="active" type="button">
            <i className="fas fa-plane"></i> Flights
          </button>
          <button type="button">
            <i className="fas fa-car"></i> Cars
          </button>
          <button type="button">
            <i className="fas fa-hotel"></i> Hotel
          </button>
        </div>

        <form
          className="home__form-entries"
          autoComplete="off"
          onSubmit={submitHandler}
        >
          <div className="home__form-flight-type">
            <label
              className={`home__form-radio-btn ${
                flightType === 'One Way' ? 'active' : 'not-active'
              }`}
              htmlFor="oneWay"
            >
              One Way
              <input
                name="flightType"
                id="oneWay"
                type="radio"
                value="One Way"
                checked={flightType === 'One Way'}
                onChange={e => setFlightType(e.target.value)}
              />
            </label>
            <label
              className={`home__form-radio-btn ${
                flightType === 'Round Trip' ? 'active' : 'not-active'
              }`}
              htmlFor="roundTrip"
            >
              Round Trip
              <input
                name="flightType"
                id="roundTrip"
                type="radio"
                value="Round Trip"
                checked={flightType === 'Round Trip'}
                onChange={e => setFlightType(e.target.value)}
              />
            </label>
          </div>

          <div className="home__places">
            {wrongPlacesError && (
              <div className="error-label">
                <i className="fas fa-exclamation-circle"></i> {wrongPlacesError}
              </div>
            )}

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
            {wrongDatesError && (
              <div className="error-label">
                <i className="fas fa-exclamation-circle"></i> {wrongDatesError}
              </div>
            )}

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
    </main>
  );
};

export default FlightsForm;
