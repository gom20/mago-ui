import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
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
    const [offset, setOffset] = useState(0);

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
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '20%',
                                    // backgroundColor: 'red',
                                }}
                            >
                                <Text style={styles.text}>
                                    {row.dateTime.month}월 {row.dateTime.date}일
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '30%',
                                    // backgroundColor: 'red',
                                }}
                            >
                                <Text style={styles.text}> {row.mountain}</Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    width: '30%',
                                    // backgroundColor: 'red',
                                }}
                            >
                                <MaterialIcons
                                    name="timer"
                                    size={15}
                                    color="black"
                                />
                                <Text style={styles.text}>
                                    {' '}
                                    {row.dateTime.totalHour}시간{' '}
                                    {row.dateTime.totalMinute}분
                                </Text>
                            </View>
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
        <View style={styles.container}>
            <View>
                <Image
                    source={require('../../assets/images/benjamin_unsplash.jpg')}
                    resizeMethod="resize"
                    resizeMode="cover"
                    style={styles.imageContainer}
                ></Image>
                <View style={styles.textContainer}>
                    <Text style={{ fontSize: 17, color: '#FFF' }}>
                        나의 산 이야기
                    </Text>
                    <Text style={{ fontSize: 12, color: '#DBDBDB' }}>
                        당신의 마지막 산행은 언제인가요?{'\n'}산 이야기를
                        펼쳐보세요.
                    </Text>
                </View>
            </View>
            <ScrollView style={styles.scrollContainer}>
                <FlatList
                    data={recordsByMonth}
                    renderItem={renderItem}
                    keyExtractor={extractKey}
                    ListEmptyComponent={renderEmptyComponent}
                    onRefresh={fetchData}
                    refreshing={isRefreshing}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red',
    },
    scrollContainer: {
        // height: '100%',
        backgroundColor: '#FFF',
    },
    imageContainer: {
        width: '100%',
        height: 200,
    },
    textContainer: {
        position: 'absolute',
        top: 130,
        left: '7%',
    },
    groupTitle: {
        fontSize: 17,
        fontWeight: '600',
        paddingVertical: 10,
        paddingHorizontal: '7%',
        borderBottomWidth: 1,
        borderBottomColor: '#BDBDBD',
        backgroundColor: '#FFF',
        // elevation: 2,
    },
    itemContainer: {
        height: 55,
        borderBottomWidth: 1,
        borderBottomColor: '#BDBDBD',
    },
    item: {
        paddingHorizontal: '7%',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
