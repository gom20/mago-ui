import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CustomButton = ({
    onPress,
    text,
    iconType,
    bgColor,
    textColor,
    width,
    height,
    fontSize,
    disabled = false,
}) => {
    const getTextStyle = () => {
        const style = {};
        style.color = textColor ? textColor : '#FFFFFF';
        style.fontSize = fontSize ? fontSize : 15;
        return style;
    };
    const getButtonStyle = () => {
        const style = {};
        style.backgroundColor = disabled
            ? '#DBDBDB'
            : bgColor
            ? bgColor
            : '#0DD36E';
        style.height = height ? height : 45;
        style.width = width ? width : '100%';
        return style;
    };

    return (
        <TouchableOpacity
            disabled={disabled}
            activeOpacity={0.8}
            onPress={onPress}
            style={[styles.defaultContainer, getButtonStyle()]}
        >
            {iconType && (
                <MaterialIcons
                    name={iconType}
                    size={20}
                    color={getTextStyle().color}
                    style={styles.icon}
                ></MaterialIcons>
            )}
            <Text style={[styles.defaultText, getTextStyle()]}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    defaultContainer: {
        alignItems: 'center',
        marginBottom: 11,
        borderRadius: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        flexDirection: 'row',
    },
    icon: {
        marginRight: 8,
    },
});

export default CustomButton;
