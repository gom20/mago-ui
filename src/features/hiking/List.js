import React from 'react';
import { ScrollView, FlatList } from 'react-native';
import Item from './Item';
import MountainsData from './../../../mountains.json';

const arr = [];
for (let i = 0; i < 100; i++) {
    arr.push(i);
}

const List = () => {
    return (
        <FlatList
            keyExtractor={(item) => item.toString()}
            data={MountainsData.data}
            renderItem={({ item }) => <Item num={item} />}
        />
    );
};

export default List;
