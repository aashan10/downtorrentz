import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import Home from './screens/Home';
import MovieDetails from './screens/MovieDetails';
import StreamMovie from './screens/Stream';
const drawer = createDrawerNavigator({
  Home : {
    screen : Home
  },
  details : {
    screen : MovieDetails
  },
  play : {
    screen : StreamMovie
  }
});

export default createAppContainer(drawer);