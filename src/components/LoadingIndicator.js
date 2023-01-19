import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

const LoadingIndicator = ({ loading }) => {
    loading = loading
        ? loading
        : useSelector((state) => state.loading.isLoading);
    return (
        loading && (
            <View style={styles.container} pointerEvents={'box-only'}>
                <ActivityIndicator size="large" color="#0DD36E" />
            </View>
        )
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

export default LoadingIndicator;
