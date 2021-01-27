const FormTabs = () => {
  return (
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
  );
};

export default FormTabs;
