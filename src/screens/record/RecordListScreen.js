import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
    BackHandler,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteRecords,
    getRecords,
    reset,
    select,
} from '../../slices/recordSlice';
import { ModalContext } from '../../utils/ModalContext';

function RecordListScreen() {
    const dispatch = useDispatch();
    const recordsByMonth = useSelector((state) => state.record.recordsByMonth);
    const records = useSelector((state) => state.record.records);
    const navigation = useNavigation();

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [itemsToDelete, setItemsToDelete] = useState([]);
    const { showModal } = useContext(ModalContext);

    const onItemPressed = (row) => {
        console.log(itemsToDelete.length);
        console.log(itemsToDelete);
        console.log('onItemPressed');
        if (!deleteMode) {
            navigation.navigate('RecordDetail', { recordId: row.uid });
        } else {
            if (itemsToDelete.includes(row.uid)) {
                setItemsToDelete(
                    itemsToDelete.filter((uid) => uid !== row.uid)
                );
            } else {
                setItemsToDelete(itemsToDelete.concat([row.uid]));
            }
        }
    };

    const activateDeleteMode = (row) => {
        setDeleteMode(true);
        setItemsToDelete(itemsToDelete.concat([row.uid]));
    };

    const inactivateDeleteMode = () => {
        setDeleteMode(false);
        setItemsToDelete([]);
    };

    const onSelectAll = () => {
        setItemsToDelete(records.map((record) => record.uid));
    };

    const onItemLongPressed = (row) => {
        console.log('longPressed');
        if (!deleteMode) {
            activateDeleteMode(row);
        }
    };

    const onDeleteRecords = async () => {
        const response = await showModal({
            async: true,
            type: 'confirm',
            message: itemsToDelete.length + ' 개 항목을 삭제하시겠습니까?',
            buttonTexts: ['아니오', '네'],
        });

        if (!response) return;
        dispatch(deleteRecords({ ids: itemsToDelete }))
            .unwrap()
            .then((response) => {
                inactivateDeleteMode();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const renderItem = ({ item }) => {
        let renderItems = [];
        if (item.groupData) {
            renderItems = item.groupData.map((row) => {
                return (
                    <TouchableHighlight
                        key={row.uid}
                        style={[
                            styles.itemContainer,
                            {
                                backgroundColor:
                                    deleteMode &&
                                    itemsToDelete.includes(row.uid)
                                        ? '#FFC0CB'
                                        : '#fff',
                            },
                        ]}
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
                <View>{renderItems}</View>
            </View>
        );
    };

    const renderEmptyComponent = () => {
        return (
            <View
                style={{
                    marginVertical: '30%',
                    alignSelf: 'center',
                    justifyContent: 'center',
                }}
            >
                <Image
                    source={require('../../assets/images/no-data.png')}
                    resizeMethod="resize"
                    resizeMode="contain"
                ></Image>
            </View>
        );
    };

    const currentPage = useSelector((state) => state.record.pageNumber);
    const last = useSelector((state) => state.record.last);
    const onEndReached = () => {
        if (last) return;
        fetchData({ page: currentPage + 1 });
    };

    const onRefresh = () => {
        // dispatch(reset());
        fetchData({ page: 0 });
    };

    const fetchData = (request) => {
        if (deleteMode) return;
        setIsRefreshing(true);
        dispatch(getRecords(request))
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
        if (deleteMode) {
            navigation.setOptions({
                headerTitle: '',
                headerRight: () => (
                    <View style={{ flexDirection: 'row' }}>
                        <Pressable
                            onPress={onDeleteRecords}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                            }}
                        >
                            <FontAwesome name="trash" size={18} color="#FFF" />
                            <Text style={{ fontSize: 10, color: '#FFF' }}>
                                삭제
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={onSelectAll}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                            }}
                        >
                            <FontAwesome name="check" size={18} color="#FFF" />
                            <Text style={{ fontSize: 10, color: '#FFF' }}>
                                전체
                            </Text>
                        </Pressable>
                    </View>
                ),
            });
        } else {
            navigation.setOptions({
                headerTitle: '나의 산 기록',
                headerRight: () => <></>,
            });
        }
    }, [deleteMode, itemsToDelete]);

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = async () => {
                if (deleteMode) {
                    inactivateDeleteMode();
                    return true;
                } else {
                    navigation.navigate('홈');
                }
            };
            const subscription = BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );
            return () => subscription.remove();
        }, [deleteMode])
    );

    useEffect(() => {
        fetchData({ page: 0 });
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
            <FlatList
                data={recordsByMonth}
                renderItem={renderItem}
                keyExtractor={extractKey}
                ListEmptyComponent={renderEmptyComponent}
                onRefresh={onRefresh}
                refreshing={isRefreshing}
                onEndReached={onEndReached}
                // onEndReachedThreshold={0.8}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red',
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
        borderBottomColor: '#EEEEEE',
        backgroundColor: '#FFF',
        // elevation: 2,
    },
    itemContainer: {
        height: 55,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
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
