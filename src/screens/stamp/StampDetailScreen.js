import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

function StampDetailScreen({ route }) {
    const dispatch = useDispatch();

    const navigation = useNavigation();

    useEffect(() => {
        // fetchData();
    }, []);

    return (
        <View>
            <Text>도장찍기 상세 화면</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: '5%',
    },
});

export default StampDetailScreen;
