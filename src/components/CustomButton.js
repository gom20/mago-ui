import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CustomButton = ({
    onPress,
    text,
    iconType,
    bgColor,
    textColor,
    height,
    fontSize,
}) => {
    const getTextStyle = () => {
        const style = {};
        style.color = textColor ? textColor : '#FFFFFF';
        style.fontSize = fontSize ? fontSize : 15;
        return style;
    };
    const getButtonStyle = () => {
        const style = {};
        style.backgroundColor = bgColor ? bgColor : '#0DD36E';
        style.height = height ? height : 45;
        return style;
    };

    return (
        <TouchableOpacity
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
        width: '100%',
        // height: 45,
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
