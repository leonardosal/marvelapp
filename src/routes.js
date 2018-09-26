import { createStackNavigator } from 'react-navigation';

import CharactersList from './pages/CharactersList';
import CharacterDetails from './pages/CharacterDetails';

const Routes = createStackNavigator({
  CharactersList,
  CharacterDetails
});

export default Routes;