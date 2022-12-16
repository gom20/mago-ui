import React from 'react';
import { View, TextInput, Pressable, Image, StyleSheet, Text } from 'react-native';

const CustomTopbar = ({ leftText, rightText, onPressLeft, onPressRight }) => {
	return (
    	<View style={styles.container}>
        	<Pressable onPress={onPressLeft}>
            	<Text style={styles.text}>{leftText}</Text>
            </Pressable>
            <Pressable onPress={onPressRight}>
            	<Text style={styles.text}>{rightText}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        marginVertical: 13,
        marginHorizontal: 23,
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: '500'
    }
});

export default CustomTopbar;