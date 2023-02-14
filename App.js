import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Splash from './onboarding/splash';

import {StoreProvider} from 'easy-peasy';
import {RouteContext} from './helper/route_context';

import AppStore from './helper/store';
import Login from './src/Auth/login';
import Signup from './src/Auth/signup';
import Home from './src/Auth/Home/home';
import Wallet from './src/Auth/Home/wallet';
import Service from './src/Auth/Home/service';
import Commerce from './src/Auth/Home/commerce';
import Payment from './src/Auth/Home/payment';
import Page from './component/Page';

const App = () => {
  const Stack = createStackNavigator();

  const AuthStack = () => (
    <Stack.Navigator headerMode={null}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );

  const HomeStack = () => (
    <Stack.Navigator headerMode={null}>
      <Stack.Screen name="Page" component={Page} />
    </Stack.Navigator>
  );

  const [currentState, setCurrentState] = React.useState(
    React.useContext(RouteContext).initState,
  );

  return (
    <StoreProvider store={AppStore}>
      <RouteContext.Provider value={{currentState, setCurrentState}}>
        <NavigationContainer>
          {currentState === 'splash' ? (
            <Splash />
          ) : currentState === 'login' ? (
            <AuthStack />
          ) : (
            <HomeStack />
          )}
          {/* <HomeStack /> */}
        </NavigationContainer>
      </RouteContext.Provider>
    </StoreProvider>
  );
};

export default App;


//email: abj97x@gmail.com
// pwd:  9999