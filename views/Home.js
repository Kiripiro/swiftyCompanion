import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { StatusBar, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import TokenManager from '../utils/TokenManager';
import ApiService from '../utils/ApiService';
import ErrorModal from '../components/Error';

export default function HomeScreen({ navigation }) {
	useEffect(() => {
		async function getTokenAndHandleData() {
			const tokenInfo = await TokenManager.getTokenInfo();
			if (tokenInfo) {
				const token = JSON.parse(tokenInfo).access_token;
				setToken(token);
			} else
				showErrorModal('Unable to get token, please try again later.');
		}
		getTokenAndHandleData();
	}, []);

	const [token, setToken] = useState(null);
	const [text, onChangeText] = useState('');
	const [errorVisible, setErrorVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	let [fontsLoaded] = useFonts({
		Inter_900Black,
	});

	if (!fontsLoaded) {
		return <Text>Loading...</Text>;
	}

	const showErrorModal = (message) => {
		setErrorMessage(message);
		setErrorVisible(true);
	};

	const closeErrorModal = () => {
		setErrorVisible(false);
		setErrorMessage('');
	};

	const handleRequest = async () => {
		if (text) {
			try {
				const login = text.toLowerCase();
				if (token) {
					const user = await ApiService.getUserData(token, login);
					const coalition = await ApiService.getUserCoalition(token, login);
					navigation.navigate('Profile', {
						userData: user,
						userProjects: user.projects,
						userCoalitions: coalition,
					});
				}
			} catch (error) {
				showErrorModal(error.message);
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

				<ErrorModal isVisible={errorVisible} errorMessage={errorMessage} onClose={closeErrorModal} />
			</View>
		</SafeAreaProvider>
	);
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
		marginBottom: 10,
	},
	text: {
		fontFamily: 'Inter_900Black',
		fontSize: 15,
		marginBottom: 10,
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		borderRadius: 10,
		width: 280,
		paddingHorizontal: 10,
	},
});