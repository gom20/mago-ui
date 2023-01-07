import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const RecordDetailScreen = () => {
    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    return (
        <View>
            <Text>Record Detail</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: '20%',
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    accountContainer: {
        marginTop: '20%',
        marginBottom: '40%',
        alignItems: 'center',
    },
    welcomeContainer: {
        flexDirection: 'row',
    },
    textUnderline: { textDecorationLine: 'underline' },
    text: {
        fontSize: 27,
        fontWeight: '400',
    },
    smallText: {
        color: '#949494',
        marginBottom: '5%',
    },
    mediumText: {
        fontSize: 20,
    },
    valueText: {
        color: '#0DD36E',
        fontWeight: '600',
    },
    recordItem: {
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 15,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '3%',
    },
});

export default RecordDetailScreen;
