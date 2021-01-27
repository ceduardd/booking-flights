import { Provider } from 'react-redux';
import store from './store';

import FlightsForm from './components/FlightsForm';

const App = () => {
  return (
    <Provider store={store}>
      <FlightsForm />
    </Provider>
  );
};

export default App;
