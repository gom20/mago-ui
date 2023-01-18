import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
    BackHandler,
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import mountains from '../../../mountains.json';
import CustomButton from '../../components/CustomButton';
import { ModalContext } from '../../utils/ModalContext';

const HomeScreen = () => {
    const [mountainName, setMountainName] = useState('');
    const navigation = useNavigation();
    const { showModal } = useContext(ModalContext);

    const onHikingPressed = () => {
        navigation.navigate('Hiking', { mountain: mountainName });
    };

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = async () => {
                const response = await showModal({
                    async: true,
                    message: '앱을 종료하시겠습니까?',
                    type: 'confirm',
                    buttonTexts: ['아니오', '네'],
                });
                if (!response) return;
                BackHandler.exitApp();
                return true;
            };

            const subscription = BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );

            return () => subscription.remove();
        }, [])
    );

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/mountain_bg2.jpg')}
                resizeMode="cover"
                style={styles.bg}
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
                    <AutocompleteDropdown
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
                        dataSet={mountains.data}
                        textInputProps={{
                            placeholder: '오늘의 산을 검색하세요.',
                            autoCorrect: false,
                            autoCapitalize: 'none',
                            style: {
                                height: 44,
                                borderRadius: 25,
                                backgroundColor: '#FFFFFF',
                                paddingLeft: 18,
                            },
                        }}
                        rightButtonsContainerStyle={{
                            right: 8,
                            height: 30,
                            alignSelf: 'center',
                        }}
                        inputContainerStyle={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: 25,
                            borderWidth: 1,
                            borderColor: '#949494',
                        }}
                        suggestionsListContainerStyle={{
                            alignSelf: 'center',
                            borderWidth: 1,
                            borderColor: '#949494',
                            borderRadius: 18,
                            paddingHorizontal: 11,
                        }}
                        suggestionsListTextStyle={{}}
                        inputHeight={45}
                        containerStyle={{ flexGrow: 1, flexShrink: 1 }}
                        renderItem={(item, text) => (
                            <Text style={{ padding: 15 }}>{item.title}</Text>
                        )}
                        suggestionsListMaxHeight={
                            Dimensions.get('window').height * 0.3
                        }
                    />
                    <View style={styles.buttonContainer}>
                        <CustomButton
                            onPress={onHikingPressed}
                            text="등산하기"
                            disabled={mountainName ? false : true}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    contentContainer: {
        paddingLeft: '10%',
        paddingRight: '10%',
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
        marginTop: '90%',
        marginHorizontal: '1%',
    },
});

export default HomeScreen;
