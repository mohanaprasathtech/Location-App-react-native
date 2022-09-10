import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

export async function handlefetch(final_link: string) {
  try {
    var res: any = await axios.get(final_link);
    return res.data;
  } catch (error) {
    Alert.alert('invalid');
  }
}

export async function handlepost(
  post_link: string,
  locationname: string,
  time: string,
) {
  try {
    var result: any = await axios.post(post_link, {
      location_name: locationname,
      time: time,
    });
    return result.data;
  } catch (error) {
    Alert.alert('invalid');
  }
}

const Home: React.FC = props => {
  const [datas, setdatas] = useState<any>([]);
  const [locationObj, setlocationObj] = useState<any>([{names: '', time: ''}]);
  const [latitude, setlatitude] = useState<any>({lat: '', lon: ''});
  const [count, setCount] = useState<number>(0);

  Geolocation.getCurrentPosition(info => {
    setlatitude({lat: info.coords.latitude, lon: info.coords.longitude});
  });

  function handleremove(itemname: string) {
    let names = itemname;
    setdatas(datas.filter(item => item.names !== names));
  }
  function handleremoveall() {
    Alert.alert('No data');
    setdatas(datas => (datas.length = 0));
  }
  var url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude.lat}%2C${latitude.log}&key=72d3412b5c7f41e5a6a667d734601a95&language=en&pretty=1`;
  var locationdata: any = handlefetch(url);
  setlocationObj([
    {
      names: locationdata?.results[0]?.components?.city,
      time: locationdata?.timestamp?.created_http,
    },
  ]);
  var postdata = handlepost(
    'https://httpstat.us/200',
    locationObj.names,
    locationObj.time,
  );

  useEffect(() => {
    let interval: any;
    if (locationObj) {
      interval = setInterval(function () {
        let tempData: any = datas.slice(0);
        tempData.push(locationObj[count]);
        setdatas(tempData);
        setCount(prev => prev + 1);
      }, 300000);
    }
    return () => clearInterval(interval);
  }, [count]);
  return (
    <View style={{marginTop: 10}}>
      <Text style={styles.header}>Location Manager</Text>
      <View>
        <Text style={styles.currenttitle}>Current Location</Text>
        {datas.length !== 0 ? (
          <View style={styles.locationview}>
            <Image
              source={{
                uri: 'https://listimg.pinclipart.com/picdir/s/30-300159_free-vector-nycs-bull-trans-n-clip-art.png',
              }}
              style={styles.img}
            />
            <View style={{marginLeft: 18}}>
              <Text style={styles.locationname}>{datas[0].names}</Text>
              <Text>{datas[0].time}</Text>
            </View>
          </View>
        ) : (
          <View></View>
        )}
      </View>
      <Text style={styles.prevtitle}>Previous Location</Text>
      <FlatList
        data={datas}
        renderItem={({item}) => (
          <>
            <View style={styles.listview}>
              <View style={{marginLeft: 18}}>
                <Text style={styles.locationname}>{item.name}</Text>
                <Text>{item.time}</Text>
              </View>
              <TouchableOpacity
                style={styles.removebtn}
                onPress={() => handleremove(item.name)}>
                <Text style={styles.removebtntext}>Remove</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      />
      {datas.length !== 0 ? (
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

export default Home;
