import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, Image, Pressable, Button} from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/CustomInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import getEnvVars from '../environment';
// import Geolocation from 'react-native-geolocation-service';

function RecordScreen() {
    const ENV = getEnvVars();
    const navigation = new useNavigation();

    const onPress = () => {
        AsyncStorage.getItem("userData").then((value) => { 
            // setTestValue(value)
            // console.error(JSON.parse(testValue).username);
            apicall(JSON.parse(value).username);
         });
      }

    const [feed, setFeed] = useState('');
    const apicall = (username) => {

		axios({
			method: 'post', 
			url: ENV.apiDomain + '/api/feeds', 
			data: JSON.stringify({
				'username': username,
				'feed': feed
			}), 
			headers: {
				"Content-Type" : "application/json; charset=utf-8"
			},
			// timeout: 5000
		})
		.then(function(response) {
			if (response.data.code == 0){
				alert('저장 완료')
                navigation.navigate('Diary')
			} else {
				
			}
		})
		.catch(function(error) {

		});
    }

    return (
        <View>
            <Text>등록화면</Text>
            <CustomInput value={feed} setValue={setFeed}
				placeholder="feed"/>
            <Button title='test' onPress={onPress}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});


export default RecordScreen;