import {useTheme} from '@react-navigation/native';
import React, {useState, useContext} from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {datacontext} from '../../App';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface FuncProps {
  handleremove: (id: number) => void;
  settheme: any;
}

const HomeStatic: React.FC<FuncProps> = props => {
  const colors = useTheme().colors;
  const maindata = useContext(datacontext);
  var today = new Date().toLocaleDateString();
  var todaytime = new Date();
  var time =
    todaytime.getHours() +
    ':' +
    todaytime.getMinutes() +
    ':' +
    todaytime.getSeconds();
  const [themestate, setthemestate] = useState<boolean>(true);
  const [currentlocation, setcurrentlocation] = useState<any>([
    {
      id: 0,
      name: 'Beryl Restaurant,Woermann St,Sw...',
      todaydate: today,
      time: time,
    },
  ]);
  function handleremoveall() {
    Alert.alert('Cleared All Previous Location');
    maindata.length = 0;
  }
  function handletheme() {
    if (themestate) {
      props.settheme('dark');
    } else {
      props.settheme('light');
    }
  }
  return (
    <View style={{marginTop: 10}}>
      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.header, {color: colors.text}]}>
          Location Manager
        </Text>
        <TouchableOpacity
          style={{marginLeft: 100, marginTop: 5}}
          onPress={() => {
            setthemestate(!themestate);
            handletheme();
          }}>
          <MaterialCommunityIcons
            name="theme-light-dark"
            size={35}
            color="blue"
          />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={[styles.currenttitle, {color: colors.text}]}>
          Current Location
        </Text>
        {currentlocation.length !== 0 ? (
          <View style={styles.locationview}>
            <Image
              source={{
                uri: 'https://listimg.pinclipart.com/picdir/s/30-300159_free-vector-nycs-bull-trans-n-clip-art.png',
              }}
              style={styles.img}
            />

            <View style={{marginLeft: 18}}>
              <Text style={[styles.locationname, {color: colors.text}]}>
                {currentlocation[0].name}
              </Text>
              <Text
                style={{
                  color: colors.text,
                }}>{`${currentlocation[0].todaydate}, ${currentlocation[0].time}`}</Text>
            </View>
          </View>
        ) : (
          <View></View>
        )}
      </View>
      <Text style={[styles.prevtitle, , {color: colors.text}]}>
        Previous Location
      </Text>
      <FlatList
        data={maindata}
        renderItem={({item}) => (
          <>
            <View style={styles.listview}>
              <View style={{marginLeft: 18}}>
                <Text style={[styles.locationname, {color: colors.text}]}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: colors.text,
                  }}>{`${item.todaydate}  ${item.time}`}</Text>
              </View>
              <TouchableOpacity
                style={styles.removebtn}
                onPress={() => props.handleremove(item.id)}>
                <Text style={styles.removebtntext}>Remove</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      />
      {maindata.length !== 0 ? (
        <TouchableOpacity style={styles.clearallbtn} onPress={handleremoveall}>
          <Text style={[styles.clearalltext, {color: colors.text}]}>
            Clear All
          </Text>
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  clearallbtn: {
    backgroundColor: '#4169E1',
    borderRadius: 2,
    marginTop: 550,
    width: 300,
    marginLeft: 65,
    position: 'absolute',
    zIndex: 1,
  },
  clearalltext: {
    textAlign: 'center',
    padding: 10,
    color: 'black',
    fontSize: 21,
  },
  header: {
    fontSize: 23,
    color: 'black',
    marginTop: 5,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  removebtntext: {
    marginTop: 2,
    textAlign: 'center',
    padding: 10,
    color: 'black',
  },
  removebtn: {
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    marginTop: 4,
  },
  locationname: {
    fontSize: 18,
    color: 'black',
    fontWeight: '700',
  },
  listview: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 10,
  },
  prevtitle: {
    marginLeft: 25,
    marginTop: 18,
  },
  img: {
    height: 50,
    width: 50,
    marginLeft: 20,
  },
  currenttitle: {
    marginLeft: 24,
    marginTop: 12,
  },
  locationview: {
    flexDirection: 'row',
    marginTop: 7,
  },
});
export default HomeStatic;
