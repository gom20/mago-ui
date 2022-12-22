import { ActivityIndicator, StyleSheet, View } from 'react-native';

const CustomActivityIndicator = () => {
    return (
        <View style={styles.container} pointerEvents={'box-only'}>
            <ActivityIndicator size="large" color="orange" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default CustomActivityIndicator;
