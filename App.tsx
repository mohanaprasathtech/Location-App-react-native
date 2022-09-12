import React, {createContext, useEffect, useState} from 'react';
import HomeStatic from './Src/static/HomeStatic';
import staticdata from './Src/static/Data';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Map from './Src/static/Map';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const datacontext = createContext<any | null>(null);
export const Tab = createBottomTabNavigator<any>();
function App() {
  const [count, setcount] = useState<number>(0);
  const [data, setdata] = useState<any>([]);

  function handleremove(id: number) {
    let ids = id;
    setdata(data.filter((item: any) => item.id !== ids));
  }

  useEffect(() => {
    let interval: any;
    if (count < 25) {
      interval = setInterval(function () {
        let tempData: any = data.slice(0);
        tempData.push(staticdata[count]);
        setdata(tempData);
        setcount(prev => prev + 1);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [count]);

  return (
    <>
      <datacontext.Provider value={data}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Location"
              options={{
                headerShown: false,
                tabBarIcon: ({focused, color, size}) => (
                  <Ionicons
                    name={focused ? 'location' : 'location-outline'}
                    color={color}
                    size={size}
                  />
                ),
              }}>
              {props => <HomeStatic handleremove={handleremove} />}
            </Tab.Screen>
            <Tab.Screen
              name="Map"
              options={{
                headerShown: false,
                tabBarIcon: ({focused, color, size}) => (
                  <FontAwesome5
                    name={focused ? 'map-marked-alt' : 'map-marked'}
                    color={color}
                    size={size}
                  />
                ),
              }}>
              {props => <Map />}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </datacontext.Provider>
    </>
  );
}

export default App;
