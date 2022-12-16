import React, { useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';

const HomeScreen = () => {
	return (
		<View style={styles.container}>
            <Text> Home Screen! </Text>
		</View>
    );
}

const styles = StyleSheet.create({
	container: {
        marginTop: '40%',
        marginLeft: '9%',
		marginRight: '9%'
    }
 })

export default HomeScreen;