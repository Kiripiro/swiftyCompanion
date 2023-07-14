import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import MyProgressBar from '../components/ProgressBar';

export default function ProfileScreen({ route, navigation }) {
    const { userData, userProjects, userCoalition } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.profileInfoContainer}>
                <ImageBackground source={{ uri: userCoalition.cover }}>
                    <Image style={styles.profileInfoContainerImage} source={{ uri: userData.profilePicture }} />
                    <MyProgressBar value={userData.level} color={userCoalition.color} />
                </ImageBackground>
                <View style={styles.profileInfoContainerText}>
                    <Text style={styles.text}>{userData.firstName} {userData.lastName} AKA {userData.login}</Text>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <MaterialIcons name="email" size={24} color="black" />
                        <Text style={[styles.textIcon]}>{userData.email}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Ionicons name="location" size={24} color="black" />
                        <Text style={styles.texIcon}>From: {userData.campus}</Text>
                    </View>
                </View>
            </View >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1: {
        color: 'black',
        fontSize: 40,
        fontFamily: 'Inter_900Black',
    },
    h2: {
        color: 'black',
        fontSize: 30,
        fontFamily: 'Inter_900Black',
    },
    textIcon: {
        color: 'black',
        fontSize: 15,
        marginLeft: 5,
    },
    profileInfoContainer: {
        width: '100%',
        height: '100%',
    },
    profileInfoContainerImage: {
        width: 150,
        height: 150,
        borderRadius: 85,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginVertical: 20,
        borderWidth: 1,
    },
    profileInfoContainerText: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 20,
        marginTop: 20,
    },
});