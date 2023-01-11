import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import mountains from './../../../mountains.json';

const HomeScreen = () => {
    const [mountainName, setMountainName] = useState('');
    const navigation = useNavigation();

    const onHikingPressed = () => {
        navigation.navigate('Hiking', { mountain: mountainName });
    };

    return (
        <ImageBackground
            source={require('../../assets/images/mountain_bg2.jpg')}
            resizeMode="stretch"
            style={styles.bg}
        >
            <KeyboardAvoidingView
            // style={styles.container}
            // enabled={false}
            // keyboardVerticalOffset={20}
            >
                <View style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.logoText}>마운틴고</Text>
                        <Text style={styles.text}>
                            오늘의 산은{'\n'}어디인가요?
                        </Text>
                        <Text style={styles.smallText}>
                            산을 먼저 찾아보세요.{'\n'}오늘도 안전하게 즐겁게
                            마운틴고!
                        </Text>
                    </View>

                    {/* <CustomInput
                        placeholder="비밀번호"
                        invalidText="비밀번호를 입력해 주세요."
                        secureTextEntry
                        maxLength={50}
                        label="비밀번호"
                    /> */}
                    <AutocompleteDropdown
                        onFocus={() => {}}
                        clearOnFocus={false}
                        closeOnBlur={true}
                        closeOnSubmit={false}
                        onSelectItem={(item) => {
                            if (item) {
                                setMountainName(item.title);
                            }
                        }}
                        onChangeText={(text) => {
                            setMountainName(text);
                        }}
                        onClear={() => {
                            setMountainName('');
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
                                backgroundColor: '#11ffee00',
                                paddingLeft: 18,
                                color: '#FFFFFF',
                            },
                        }}
                        rightButtonsContainerStyle={{
                            right: 8,
                            height: 30,
                            alignSelf: 'center',
                        }}
                        inputContainerStyle={{
                            backgroundColor: '#11ffee00',
                            borderRadius: 25,
                            borderWidth: 1,
                            borderColor: '#BDBDBD',
                        }}
                        suggestionsListContainerStyle={{
                            backgroundColor: '#11ffee00',
                            borderWidth: 1,
                            // width: '80%',
                            alignSelf: 'center',
                            borderColor: '#BDBDBD',
                            // borderRadius: 25,
                            color: '#FFFFFF',
                        }}
                        suggestionsListTextStyle={{
                            fontFamily: 'Jalnan',
                            color: '#BDBDBD',
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
                            disabled={mountainName ? false : true}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // flex: 1,
        // justifyContent: 'space-evenly',
        // backgroundColor: '#FFFFFF',
        backgroundColor: 'red',
    },
    bg: {
        width: '100%',
        height: '100%',

        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        // flex: 1,
        // justifyContent: 'space-between',
        // flexDirection: 'column',
    },
    contentContainer: {
        paddingLeft: '10%',
        paddingRight: '10%',
        // backgroundColor: 'purple',
    },
    textContainer: {
        marginTop: '30%',
        marginBottom: '10%',
    },
    logoText: {
        fontFamily: 'Jalnan',
        fontSize: 14,
        color: '#0DD36E',
    },
    text: {
        fontSize: 28,
        fontWeight: '300',
        marginBottom: '3%',
        color: '#FFFFFF',
    },
    smallText: {
        color: '#949494',
        marginBottom: '5%',
        color: '#BDBDBD',
    },
    buttonContainer: {
        marginTop: '80%',
        backgroundColor: 'red',
    },
});

export default HomeScreen;
