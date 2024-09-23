import { Image, ImageBackground, StyleSheet, Text, View, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import MyProgressBar from '../components/ProgressBar';
import RadarChart from '../components/RadarChart';
import ProjectsList from '../components/ProjectsList';
import { useState, useEffect } from 'react';

export default function ProfileScreen({ route, navigation }) {
    const { userData, userProjects, userCoalitions } = route.params;
    const [selectedCursus, setSelectedCursus] = useState('21');
    const [currentCoalition, setCurrentCoalition] = useState(null);

    useEffect(() => {
        const coalition = userCoalitions.find(c => c.cursus == selectedCursus);
        setCurrentCoalition(coalition);
    }, [selectedCursus, userCoalitions]);

    const handleCursusChange = (newCursus) => {
        setSelectedCursus(newCursus);
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileInfoContainer}>
                {currentCoalition ? (
                    <ImageBackground source={{ uri: currentCoalition.cover }} style={styles.imageBackground}>
                        <Image style={styles.profileInfoContainerImage} source={{ uri: userData.profilePicture }} />
                        <Text style={styles.subtitle}>Coalition: {currentCoalition.name}</Text>
                        <MyProgressBar value={selectedCursus === '21' ? userData.level : userData.levelPiscine} color={currentCoalition.color} />
                    </ImageBackground>
                ) : (
                    <Text>Loading coalition...</Text>
                )}
                <View style={styles.profileInfoContainerText}>
                    <Text style={styles.h3}>{userData.firstName} {userData.lastName} - {userData.login}</Text>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <MaterialIcons name="email" size={24} color="black" />
                        <Text style={styles.textIcon}>{userData.email}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Ionicons name="location" size={24} color="black" />
                        <Text style={styles.textIcon}>{userData.campus}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Text style={styles.h3}> ₳ </Text>
                        <Text style={styles.textIcon}>{userData.wallet}</Text>
                    </View>
                </View>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.skillsView}>
                    <Text style={[styles.h2, styles.sectionsTitles]}>Skills</Text>
                    <RadarChart skills={userData.skills} />
                </View>
                <View style={styles.projectsView}>
                    <Text style={[styles.h2, styles.sectionsTitles]}>Projects</Text>
                    <ProjectsList projects={userProjects} onCursusChange={handleCursusChange} />
                </View>
            </ScrollView>
        </View>
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
    h3: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'Inter_900Black',
    },
    subtitle: {
        color: 'white',
        fontSize: 15,
        marginLeft: 5,
    },
    textIcon: {
        color: 'black',
        fontSize: 15,
        marginLeft: 5,
    },
    profileInfoContainer: {
        flex: 0.7,
        width: '100%',
    },
    imageBackground: {
        flex: 1,
        padding: 0,
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
        flex: 0.35,
        flexDirection: 'column',
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal: 20,
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    sectionsTitles: {
        marginLeft: 20,
        marginBottom: 10,
    },
    skillsView: {
        flex: 1,
        width: '100%',
        marginTop:10,
        marginBottom: 20,
    },
    projectsView: {
        flex: 1,
        width: '100%',
        marginBottom: 20,
    },
});
