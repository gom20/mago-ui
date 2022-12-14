import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { BackHandler, Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectRecordById } from '../../slices/recordSlice';

const RecordDetailScreen = ({ route }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { recordId } = route.params;
    const record = useSelector((state) =>
        selectRecordById(state.record, recordId)
    );
    const [snapshotUri, setSnapshotUri] = useState(null);
    useEffect(() => {
        setSnapshotUri(record.imgPath);
        const backAction = () => {
            navigation.navigate('RecordList');
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => backHandler.remove();
    }, [record]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {record.dateTime.year}년 {record.dateTime.month}월{' '}
                {record.dateTime.date}일 {record.dateTime.weekday}
            </Text>
            <View style={styles.summaryContainer}>
                <View style={styles.summaryItem}>
                    <FontAwesome5 name="mountain" size={24} color="black" />
                    <Text>{record.mountain}</Text>
                </View>
                <View style={styles.summaryItem}>
                    <FontAwesome5 name="hiking" size={24} color="black" />
                    <Text>
                        {record.dateTime.totalHour}시간{' '}
                        {record.dateTime.totalMinute}분
                    </Text>
                </View>
                <View style={styles.summaryItem}>
                    <MaterialCommunityIcons
                        name="map-marker-distance"
                        size={24}
                        color="black"
                    />
                    <Text>{record.distance.toFixed(2)}m</Text>
                </View>
            </View>
            <View style={styles.snapshotContainer}>
                <Image
                    style={styles.snapshot}
                    defaultSource={require('../../assets/images/mago_logo_green.png')}
                    // source={require('../../assets/images/mago_logo_green.png')}
                    source={{ uri: snapshotUri }}
                />
            </View>
            <View style={styles.recordContainer}>
                <View style={[styles.recordItem, styles.recordItemLeft]}>
                    <Text style={styles.smallText}>총 등산 시간</Text>
                    <Text style={styles.boldText}>
                        {record.dateTime.totalHour}시간{' '}
                        {record.dateTime.totalMinute}분
                    </Text>
                </View>
                <View style={[styles.recordItem, styles.recordItemRight]}>
                    <Text style={styles.smallText}>총 등산 거리</Text>
                    <Text style={styles.boldText}>
                        {record.distance.toFixed(2)}m
                    </Text>
                </View>
            </View>
            <View style={styles.recordContainer}>
                <View style={[styles.recordItem, styles.recordItemLeft]}>
                    <Text style={styles.smallText}>등산 시작</Text>
                    <Text style={styles.boldText}>
                        {record.dateTime.startAmpm} {record.dateTime.startHour}
                        시 {record.dateTime.startMinute}분
                    </Text>
                </View>
                <View style={[styles.recordItem, styles.recordItemRight]}>
                    <Text style={styles.smallText}>등산 완료</Text>

                    <Text style={styles.boldText}>
                        {record.dateTime.endAmpm} {record.dateTime.endHour}시{' '}
                        {record.dateTime.endMinute}분
                    </Text>
                </View>
            </View>
            <View style={styles.recordContainer}>
                <View style={[styles.recordItem, styles.recordItemLeft]}>
                    <Text style={styles.smallText}>최저 고도</Text>
                    <Text style={styles.boldText}>
                        {record.minAltitude.toFixed(2)} m
                    </Text>
                </View>
                <View style={[styles.recordItem, styles.recordItemRight]}>
                    <Text style={styles.smallText}>최고 고도</Text>
                    <Text style={styles.boldText}>
                        {record.maxAltitude.toFixed(2)} m
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    text: {
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center',
    },
    smallText: {
        fontSize: 13,
    },
    boldText: {
        fontWeight: '600',
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderRadius: 12,
        height: '12%',
        marginVertical: '5%',
        alignItems: 'center',
    },
    summaryItem: {
        alignItems: 'center',
    },
    snapshotContainer: {
        marginBottom: '5%',
    },
    snapshot: {
        width: 300,
        height: 200,
        backgroundColor: 'red',
        borderRadius: 20,
        // elevation: 2,
    },
    recordContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: '3%',
        alignItems: 'stretch',
    },
    recordItem: {
        borderWidth: 1,
        borderRadius: 10,
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        height: 70,
        alignItems: 'center',
    },
    recordItemLeft: {
        marginRight: '1%',
    },
    recordItemRight: {
        marginLeft: '1%',
    },
});

export default RecordDetailScreen;
