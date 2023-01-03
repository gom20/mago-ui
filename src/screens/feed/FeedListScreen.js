import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import {
    Platform,
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image,
    Pressable,
    FlatList,
    SafeAreaView,
} from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
// import Geolocation from 'react-native-geolocation-service';
import getEnvVars from '../../environment';

function DiaryScreen() {
    const [feeds, setFeeds] = useState([]);

    const ENV = getEnvVars();
    const apiCall = () => {
        axios({
            method: 'get',
            url: ENV.apiDomain + '/api/feeds',
            // data: JSON.stringify({
            // 	'username': 'rhaldud89@gmail.com',
            // 	'password': 'test'
            // }),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            // timeout: 5000
        })
            .then(function (response) {
                // console.error('...')
                if (response.data.code == 0) {
                    // data = response.data;
                    // console.error(response.data.data)
                    setFeeds(response.data.data);
                    // console.error(response.data.data)
                    // console.error(feeds)
                    // AsyncStorage.setItem('userData', JSON.stringify({'username': 'rhaldud89@gmail.com', 'token': response.data.data.token}), () => {
                    // 	navigation.navigate('AppTabComponent');
                    // })
                } else {
                }
            })
            .catch(function (error) {});
    };

    useEffect(() => {
        apiCall();
        console.log('useEffect를 활용한 componentDidMount');
    }, []);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <View>
                    <Text>user id: {item.username}</Text>
                </View>
                <View>
                    <Text>id: {item.feed}</Text>
                </View>
            </View>
        );
    };

    return (
        <View>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={feeds}
                    renderItem={renderItem}
                    keyExtractor={(item) => String(item.id)}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: '9%',
        marginLeft: '9%',
        marginRight: '9%',
    },
    item: {
        borderBottomWidth: 1,
        height: 100,
    },
});

export default DiaryScreen;
