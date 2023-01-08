import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getRecords } from '../../slices/recordSlice';

function RecordListScreen() {
    const dispatch = useDispatch();
    const recordsByMonth = useSelector((state) => state.record.recordsByMonth);
    const navigation = useNavigation();

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const onItemPressed = (row) => {
        navigation.navigate('RecordDetail', { recordId: row.uid });
    };
    const onItemLongPressed = (row) => {
        console.log('longPressed');
        // if (!deleteMode) {
        setDeleteMode(true);
        // console.log(deleteMode);
        // }
    };

    const renderItem = ({ item }) => {
        let items = [];
        if (item.groupData) {
            items = item.groupData.map((row) => {
                return (
                    <TouchableHighlight
                        key={row.uid}
                        style={styles.itemContainer}
                        activeOpacity={0.8}
                        underlayColor="#DBDBDB"
                        onPress={() => onItemPressed(row)}
                        onLongPress={() => onItemLongPressed(row)}
                    >
                        <View style={styles.item}>
                            <Text style={styles.text}>
                                {row.dateTime.month}월 {row.dateTime.date}일
                            </Text>
                            <Text style={styles.text}>{row.mountain}</Text>
                            <Text style={styles.text}>
                                {row.dateTime.totalHour}시간{' '}
                                {row.dateTime.totalMinute}분
                            </Text>
                        </View>
                    </TouchableHighlight>
                );
            });
        }
        return (
            <View>
                <Text style={styles.groupTitle}>
                    {item.groupId.substr(0, 4)}년 {item.groupId.substr(4, 2)}월
                </Text>
                <View>{items}</View>
            </View>
        );
    };

    const renderEmptyComponent = () => {
        return (
            <View>
                <Text>아무것도 없어용.</Text>
            </View>
        );
    };

    const fetchData = () => {
        setIsRefreshing(true);
        dispatch(getRecords())
            .unwrap()
            .then((response) => {
                setIsRefreshing(false);
            })
            .catch((error) => {
                setIsRefreshing(false);
            });
    };

    const extractKey = ({ groupData }) => groupData;

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <FlatList
                data={recordsByMonth}
                renderItem={renderItem}
                keyExtractor={extractKey}
                ListEmptyComponent={renderEmptyComponent}
                onRefresh={fetchData}
                refreshing={isRefreshing}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: '5%',
    },
    groupTitle: {
        fontSize: 17,
        // fontWeight: '600',
        marginBottom: 5,
    },
    itemContainer: {
        borderWidth: 1,
        // height: 100,
        borderRadius: 12,
        height: 60,
        marginBottom: '3%',
    },
    item: {
        paddingHorizontal: '3%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '100%',
    },
    text: {
        fontSize: 16,
        textAlignVertical: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        top: 0,

        backgroundColor: '#000',
        height: 25,
        width: 25,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
});

export default RecordListScreen;
