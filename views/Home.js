import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { StatusBar, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import TokenManager from '../utils/TokenManager';
import ApiService from '../utils/ApiService';

export default function HomeScreen({ navigation }) {
    useEffect(() => {
        async function getTokenAndHandleData() {
            const tokenInfo = await TokenManager.getTokenInfo();
            if (tokenInfo) {
                const token = JSON.parse(tokenInfo).access_token;
                setToken(token);
            }
        }
        getTokenAndHandleData();
    }, []);

    const [token, setToken] = useState(null);
    const [text, onChangeText] = useState('');
    const [userData, setUserData] = useState(null);
    const [userProjects, setUserProjects] = useState(null);
    const [userCoalition, setUserCoalition] = useState(null);

    let [fontsLoaded] = useFonts({
        Inter_900Black,
    });

    if (!fontsLoaded) {
        return <Text>Loading...</Text>;
    }

    const handleRequest = async () => {
        if (text) {
            try {
                const login = text.toLowerCase();
                if (token) {
                    const user = await ApiService.getUserData(token, login);
                    setUserData(user);
                    const projects = await ApiService.getUserProjects(token, login);
                    setUserProjects(projects);
                    const coalition = await ApiService.getUserCoalition(token, login);
                    setUserCoalition(coalition);
                    navigation.navigate('Profile', { userData: user, userProjects: projects, userCoalition: coalition });
                }
            } catch (error) {
                throw error;
            }
        }
    };
    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <Text style={styles.title}>Swifty Companion</Text>
                <Text style={styles.text}>Easily preview a 42 student's profile !</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Find user's info by login..."
                    placeholderTextColor="black"
                    returnKeyType="send"
                    onSubmitEditing={handleRequest}
                />
                <Button title="Find" onPress={handleRequest} />
                <StatusBar barStyle="dark-content" animated={true} backgroundColor="#ea392f" />
            </View>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Inter_900Black',
        fontSize: 30,
    },
    text: {
        fontFamily: 'Inter_900Black',
        fontSize: 15,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        width: 200,
        paddingHorizontal: 10,
    },
});