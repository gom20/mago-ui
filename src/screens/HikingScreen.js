import React, { useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import List from '../components/List';

const HikingScreen = () => {
    return (
        <View style={styles.container}>
            <List />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: '9%',
        marginLeft: '9%',
        marginRight: '9%',
    },
});

export default HikingScreen;
