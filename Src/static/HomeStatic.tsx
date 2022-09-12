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

interface FuncProps {
  handleremove: (id: number) => void;
}

const HomeStatic: React.FC<FuncProps> = props => {
  const maindata = useContext(datacontext);
  var today = new Date().toLocaleDateString();
  var todaytime = new Date();
  var time =
    todaytime.getHours() +
    ':' +
    todaytime.getMinutes() +
    ':' +
    todaytime.getSeconds();

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
  return (
    <View style={{marginTop: 10}}>
      <Text style={styles.header}>Location Manager</Text>
      <View>
        <Text style={styles.currenttitle}>Current Location</Text>
        {currentlocation.length !== 0 ? (
          <View style={styles.locationview}>
            <Image
              source={{
                uri: 'https://listimg.pinclipart.com/picdir/s/30-300159_free-vector-nycs-bull-trans-n-clip-art.png',
              }}
              style={styles.img}
            />
            <View style={{marginLeft: 18}}>
              <Text style={styles.locationname}>{currentlocation[0].name}</Text>
              <Text>{`${currentlocation[0].todaydate}, ${currentlocation[0].time}`}</Text>
            </View>
          </View>
        ) : (
          <View></View>
        )}
      </View>
      <Text style={styles.prevtitle}>Previous Location</Text>
      <FlatList
        data={maindata}
        renderItem={({item}) => (
          <>
            <View style={styles.listview}>
              <View style={{marginLeft: 18}}>
                <Text style={styles.locationname}>{item.name}</Text>
                <Text>{`${item.todaydate}  ${item.time}`}</Text>
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
          <Text style={styles.clearalltext}>Clear All</Text>
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
