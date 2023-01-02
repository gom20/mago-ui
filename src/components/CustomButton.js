import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CustomButton = ({ onPress, text, iconType, bgColor, textColor }) => {
    const getTextColor = () => {
        const style = {};
        if (textColor) style.color = textColor;
        else style.color = '#FFFFFF';
        return style;
    };
    const getBackgroundColor = () => {
        const style = {};
        if (bgColor) style.backgroundColor = bgColor;
        else style.backgroundColor = '#0DD36E';
        return style;
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={[styles.defaultContainer, getBackgroundColor()]}
        >
            {iconType && (
                <MaterialIcons
                    name={iconType}
                    size={20}
                    color={getTextColor().color}
                    style={styles.icon}
                ></MaterialIcons>
            )}
            <Text style={[styles.defaultText, getTextColor()]}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    defaultContainer: {
        width: '100%',
        height: 45,
        alignItems: 'center',
        marginBottom: 11,
        borderRadius: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        flexDirection: 'row',
    },
    defaultText: {
        fontSize: 15,
    },
    icon: {
        marginRight: 8,
    },
});

export default CustomButton;
