import { Provider } from 'react-redux';
import store from './store';

import FlightsForm from './components/FlightsForm';

const App = () => {
  return (
    <Provider store={store}>
      <main className="home__container">
        <FlightsForm />
      </main>
    </Provider>
  );
};

export default App;
