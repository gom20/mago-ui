import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, Image, Pressable } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
// import Geolocation from 'react-native-geolocation-service';

function RecordScreen() {

    return (
        <View>
            <Text>등록화면</Text>

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