import '@testing-library/jest-dom';
import '@testing-library/react';
import { shallow } from 'enzyme';
import AdultIcon from '../../../components/icons/AdultIcon';
import TravelerSelector from '../../../components/selectors/TravelerSelector';

describe('<TravelerSelector />', () => {
  test('should be match with snapshot', () => {
    const wrapper = shallow(<TravelerSelector icon={AdultIcon} />);

    expect(wrapper).toMatchSnapshot();
  });

  test('should have the correct props', () => {
    const label = 'Adults';

    const changeHandler = jest.fn();

    const wrapper = shallow(
      <TravelerSelector
        label={label}
        icon={AdultIcon}
        changeHandler={changeHandler}
        value={0}
      />
    );

    const input = wrapper.find('.form-control');

    const e = {
      target: {
        value: 1,
      },
    };

    input.simulate('change', e);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('span').text()).toBe(`${label}:`);
    expect(changeHandler).toHaveBeenCalled();
  });
});
