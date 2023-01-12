import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { back } from 'react-native/Libraries/Animated/Easing';

const CustomInput = ({
    value,
    setValue,
    onChange,
    placeholder,
    secureTextEntry,
    label,
    invalidFlag,
    invalidText,
    maxLength,
    editable,
    backgroundColor,
}) => {
    const [isPasswordSecure, setIsPasswordSecure] = useState(secureTextEntry);
    const [inputStyle, setInputStyle] = useState({ borderColor: '#000000' });

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    value={value}
                    onChangeText={setValue}
                    onChange={onChange}
                    placeholder={placeholder}
                    style={[
                        styles.input,
                        inputStyle,
                        {
                            backgroundColor: backgroundColor
                                ? backgroundColor
                                : '#FFF',
                        },
                    ]}
                    secureTextEntry={isPasswordSecure}
                    maxLength={maxLength ? maxLength : 50}
                    onEndEditing={(e) => {
                        setValue(e.nativeEvent.text.trim());
                    }}
                    autoCapitalize="none"
                    onFocus={() => setInputStyle({ borderColor: '#0DD36E' })}
                    onBlur={() => setInputStyle({ borderColor: '#000000' })}
                    editable={editable}
                />
                {secureTextEntry && (
                    <MaterialCommunityIcons
                        name={isPasswordSecure ? 'eye-off' : 'eye'}
                        size={24}
                        color={isPasswordSecure ? '#949494' : '#000000'}
                        style={{
                            position: 'absolute',
                            zIndex: 2,
                            right: 15,
                            top: 11,
                        }}
                        onPress={() => {
                            setIsPasswordSecure(!isPasswordSecure);
                        }}
                    />
                )}
            </View>
            {invalidFlag && (
                <View style={{ flexDirection: 'row' }}>
                    <MaterialIcons
                        name="warning"
                        size={15}
                        color="#949494"
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
    },
    input: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        height: 48,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 25,
        marginBottom: 5,
        borderWidth: 1,
        color: '#000',
    },
    invalid: {
        fontSize: 12,
        color: '#949494',
    },
});

export default CustomInput;
