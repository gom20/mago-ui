import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import { logout } from '../../slices/authSlice';
import mountains from './../../../mountains.json';

const HomeScreen = () => {
    const auth = useSelector((state) => state.auth);
    const [mountain, setMountain] = useState('');

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onHikingPressed = () => {
        navigation.navigate('Hiking');
    };

    const onPostPressed = () => {
        navigation.navigate('Hiking');
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
            keyboardShouldPersistTaps={'handled'}
        >
            <View>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/images/mago_logo_green.png')}
                        style={styles.logo}
                    ></Image>
                    <Text style={styles.text}>
                        오늘의 산은{'\n'}어디인가요?
                    </Text>
                    <Text style={styles.smallText}>
                        산을 먼저 찾아보세요.{'\n'}오늘도 안전하게 즐겁게
                        마운틴고!
                    </Text>
                </View>

                <AutocompleteDropdown
                    onFocus={() => {}}
                    clearOnFocus={false}
                    closeOnBlur={true}
                    closeOnSubmit={false}
                    onSelectItem={(item) => {
                        if (item) {
                            setMountain(item.title);
                        }
                    }}
                    onChangeText={(text) => {
                        setMountain(text);
                    }}
                    onClear={() => {
                        setMountain('');
                    }}
                    onOpenSuggestionsList={() => {
                        console.log('dropdownlist');
                    }}
                    dataSet={mountains.data}
                    textInputProps={{
                        placeholder: '오늘의 산을 검색하세요.',
                        autoCorrect: false,
                        autoCapitalize: 'none',
                        style: {
                            height: 44,
                            borderRadius: 25,
                            backgroundColor: '#ffffff',
                            paddingLeft: 18,
                        },
                    }}
                    rightButtonsContainerStyle={{
                        right: 8,
                        height: 30,
                        alignSelf: 'center',
                    }}
                    inputContainerStyle={{
                        backgroundColor: '#ffffff',
                        borderRadius: 25,
                        borderWidth: 1,
                    }}
                    suggestionsListContainerStyle={{
                        backgroundColor: '#ffffff',
                        borderWidth: 1,
                        // width: '80%',
                        alignSelf: 'center',
                        // borderRadius: 25,
                    }}
                    inputHeight={45}
                    containerStyle={{ flexGrow: 1, flexShrink: 1 }}
                    renderItem={(item, text) => (
                        <Text style={{ padding: 15 }}>{item.title}</Text>
                    )}
                />
                <View style={styles.buttonContainer}>
                    <CustomButton
                        onPress={onHikingPressed}
                        text="등산하기"
                        disabled={mountain ? false : true}
                    />
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    logoContainer: {
        marginTop: '30%',
        marginBottom: '10%',
    },
    buttonContainer: {
        marginTop: '80%',
    },
    text: {
        fontSize: 28,
        fontWeight: '300',
        marginBottom: '3%',
    },
    smallText: {
        color: '#949494',
        marginBottom: '5%',
    },
});

export default HomeScreen;
