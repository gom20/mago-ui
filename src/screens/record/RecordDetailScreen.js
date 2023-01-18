import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { BackHandler, Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRecordById } from '../../slices/recordSlice';

const RecordDetailScreen = ({ route }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [imageLoadError, setImageLoadError] = useState(false);

    const { recordId } = route.params;
    const record = useSelector((state) =>
        selectRecordById(state.record, recordId)
    );
    const [snapshotUri, setSnapshotUri] = useState(null);

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = async () => {
                navigation.navigate('RecordList');
                return true;
            };
            const subscription = BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );
            return () => subscription.remove();
        }, [])
    );

    useEffect(() => {
        setSnapshotUri(record.imgPath);
    }, [record]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {record.dateTime.year}년 {record.dateTime.month}월{' '}
                {record.dateTime.date}일 {record.dateTime.weekday}
            </Text>
            <View style={styles.summaryContainer}>
                <View style={styles.summaryItem}>
                    <FontAwesome5 name="mountain" size={20} color="#FFF" />
                    <Text style={{ color: '#FFF', marginTop: 5 }}>
                        {record.mountain}
                    </Text>
                </View>
                <View style={[styles.verticalLine, { height: '30%' }]}></View>
                <View style={styles.summaryItem}>
                    <FontAwesome5 name="hiking" size={24} color="#FFF" />
                    <Text style={{ color: '#FFF', marginTop: 5 }}>
                        {record.dateTime.totalHour}시간{' '}
                        {record.dateTime.totalMinute}분
                    </Text>
                </View>
                <View style={[styles.verticalLine, { height: '30%' }]}></View>
                <View style={styles.summaryItem}>
                    <MaterialCommunityIcons
                        name="map-marker-distance"
                        size={24}
                        color="#FFF"
                    />
                    <Text style={{ color: '#FFF', marginTop: 5 }}>
                        {record.distance.toFixed(2)}m
                    </Text>
                </View>
            </View>
            <View style={styles.snapshotContainer}>
                <Image
                    style={styles.snapshot}
                    onError={(error) => {
                        setImageLoadError(true);
                    }}
                    source={
                        imageLoadError
                            ? require('../../assets/images/record-detail-default.png')
                            : { uri: snapshotUri }
                    }
                    resizeMode="cover"
                />
            </View>
            <View style={styles.recordContainer}>
                <View style={styles.recordItemContainer}>
                    <View style={[styles.recordItem, styles.recordItemLeft]}>
                        <Text style={styles.smallText}>총 등산 시간</Text>
                        <Text style={styles.boldText}>
                            {record.dateTime.totalHour}시간{' '}
                            {record.dateTime.totalMinute}분
                        </Text>
                    </View>
                    <View style={styles.verticalLine}></View>
                    <View style={[styles.recordItem, styles.recordItemRight]}>
                        <Text style={styles.smallText}>총 등산 거리</Text>
                        <Text style={styles.boldText}>
                            {record.distance.toFixed(2)} m
                        </Text>
                    </View>
                </View>
                <View style={styles.recordItemContainer}>
                    <View style={[styles.recordItem, styles.recordItemLeft]}>
                        <Text style={styles.smallText}>등산 시작</Text>
                        <Text style={styles.boldText}>
                            {record.dateTime.startAmpm}{' '}
                            {record.dateTime.startHour}시{' '}
                            {record.dateTime.startMinute}분
                        </Text>
                    </View>
                    <View style={styles.verticalLine}></View>
                    <View style={[styles.recordItem, styles.recordItemRight]}>
                        <Text style={styles.smallText}>등산 완료</Text>

                        <Text style={styles.boldText}>
                            {record.dateTime.endAmpm} {record.dateTime.endHour}
                            시 {record.dateTime.endMinute}분
                        </Text>
                    </View>
                </View>
                <View style={styles.recordItemContainer}>
                    <View style={[styles.recordItem, styles.recordItemLeft]}>
                        <Text style={styles.smallText}>최저 고도</Text>
                        <Text style={styles.boldText}>
                            {record.minAltitude.toFixed(2)} m
                        </Text>
                    </View>
                    <View style={styles.verticalLine}></View>
                    <View style={[styles.recordItem, styles.recordItemRight]}>
                        <Text style={styles.smallText}>최고 고도</Text>
                        <Text style={styles.boldText}>
                            {record.maxAltitude.toFixed(2)} m
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#FFFFFF',
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    text: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    smallText: {
        fontSize: 12,
        color: '#0DD36E',
    },
    boldText: {
        fontWeight: '600',
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 12,
        height: '12%',
        marginVertical: '5%',
        alignItems: 'center',
        backgroundColor: '#0DD36E',
        elevation: 1,
    },
    summaryItem: {
        alignItems: 'center',
    },
    snapshotContainer: {
        marginBottom: '5%',
        backgroundColor: '#FFF',
        elevation: 1,
        // shadowColor: '#202020',
        // shadowOffset: { width: 0, height: 0 },
        // shadowRadius: 5,
        borderRadius: 10,
    },
    snapshot: {
        width: '100%',
        height: 200,
        // backgroundColor: 'red',
        borderRadius: 10,
        // elevation: 3,
    },
    recordContainer: {
        backgroundColor: '#F8F8F8',
        borderRadius: 10,
        elevation: 1,
    },
    recordItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: '3%',
        alignItems: 'stretch',
    },
    recordItem: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        height: 70,
        alignItems: 'center',
    },
    recordItemLeft: {
        marginRight: '1%',
    },
    verticalLine: {
        height: '60%',
        width: 2,
        backgroundColor: '#EEEEEE',
        alignSelf: 'center',
    },
    recordItemRight: {
        marginLeft: '1%',
    },
});

export default RecordDetailScreen;
