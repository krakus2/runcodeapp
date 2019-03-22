import Tooltip from '../src/components/utils/Tooltip';
import Enzyme, { shallow, render, mount } from 'enzyme';

it('renders correctly', () => {
   const wrapper = shallow(<Tooltip title="Tooltip" />);
   expect(wrapper).toMatchSnapshot();
});
