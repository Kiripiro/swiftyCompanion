import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './views/Home';
import ProfileScreen from './views/Profile';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

registerRootComponent(App);

export default function App() {

	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Profile" component={ProfileScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}