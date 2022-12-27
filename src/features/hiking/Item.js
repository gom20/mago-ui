import React from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Item = ({num}) => {
  const onPressFunction = () => {
    navigation.navigate('Gps');
  }
  const navigation = useNavigation(); 
  
  return (
    <Pressable onPress={onPressFunction} style={styles.container}>
      <Text style={styles.text}>{num}</Text>
    </Pressable>
  );
};



const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    height: 100,
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 30,
  },
});

export default Item;