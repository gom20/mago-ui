import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const PwResetScreen = () => {
    return (
        <View style={styles.container}>
            <Text>fsdfsdf</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: '40%',
        marginLeft: '9%',
        marginRight: '9%',
    },
    inputContainer: {},
    text: {
        fontSize: 25,
        fontWeight: '500',

        lineHeight: 29.3,
    },
    smallText: {
        fontSize: 12,
        fontWeight: '300',
        marginTop: 5,
        marginBottom: 50,
    },
    line: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: '5%',
        marginBottom: '5%',
    },
    image: {
        width: '100%',
    },
    otherButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },
    otherButtonText: {
        fontWeight: '500',
        fontSize: 12,
    },
});

export default PwResetScreen;
