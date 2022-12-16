import React from 'react';
import { View, TextInput, Pressable, Image, StyleSheet } from 'react-native';

const CustomInput = ({value, setValue, placeholder, secureTextEntry}) => {
	return (
        <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            style={styles.input}    
            secureTextEntry={secureTextEntry}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#FFFFFF',
        height: 48,
        paddingLeft: 15,
        borderRadius: 5,
        marginBottom: 18,
    }
});

export default CustomInput;