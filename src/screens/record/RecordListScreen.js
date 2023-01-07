import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
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
    const records = useSelector((state) => state.record.records);
    const navigation = useNavigation();

    const onItemPressed = (row) => {
        console.error(row.uid);
        navigation.navigate('RecordDetail');
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
                    >
                        <View style={styles.item}>
                            <Text style={styles.text}>
                                {row.dateTime.month}월 {row.dateTime.day}일
                            </Text>
                            <Text style={styles.text}>{row.mountain}</Text>
                            <Text style={styles.text}>
                                {row.dateTime.hour}시간 {row.dateTime.minute}분
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

    const callApi = () => {
        dispatch(getRecords())
            .unwrap()
            .then((response) => {})
            .catch((error) => {});
    };

    const extractKey = ({ groupData }) => groupData;

    useEffect(() => {
        callApi();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <FlatList
                data={records}
                renderItem={renderItem}
                keyExtractor={extractKey}
                ListEmptyComponent={renderEmptyComponent}
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
});

export default RecordListScreen;
