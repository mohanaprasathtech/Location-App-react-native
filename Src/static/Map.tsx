import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Marker} from 'react-native-maps';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
function Map() {
  const [latitude, setlatitude] = useState<any>({lat: '', lon: ''});
  Geolocation.getCurrentPosition(info => {
    setlatitude({lat: info.coords.latitude, lon: info.coords.longitude});
  });
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: latitude.lat,
          longitude: latitude.lon,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        style={styles.map}>
        <Marker
          coordinate={{
            latitude: latitude.lat,
            longitude: latitude.lon,
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    height: '100%',
    width: '100%',
  },
});
export default Map;
