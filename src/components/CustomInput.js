import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CustomInput = ({
    value,
    setValue,
    onChange,
    placeholder,
    secureTextEntry,
    label,
    invalidFlag,
    invalidText,
}) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                value={value}
                onChangeText={setValue}
                onChange={onChange}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
            />
            {invalidFlag && (
                <View style={{ flexDirection: 'row' }}>
                    <MaterialIcons
                        name="warning"
                        size={15}
                        color="#FF8000"
                    ></MaterialIcons>
                    <Text style={styles.invalid}> {invalidText}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#FFFFFF',
        height: 48,
        paddingLeft: 15,
        borderRadius: 5,
        marginBottom: 5,
    },
    invalid: {
        fontSize: 12,
        color: '#FF8000',
    },
});

export default CustomInput;
