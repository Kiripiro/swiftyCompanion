import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, ScrollView } from 'react-native';
import { Picker } from "@react-native-picker/picker";

const ProjectsList = ({ projects, onCursusChange }) => {
    const [cursus, setCursus] = useState('21');
    const pickerData = [
        { label: '42cursus', value: '21' },
        { label: 'C Piscine', value: '9' },
    ];

    function isProjectInProgress() {
        return projects.some(project => project.status === 'in_progress' && String(project.cursus_ids[0]) === cursus);
    }

    const getProjectsByCursus = () => {
        let projectsByCursus = [];
        projects.filter(project => String(project.cursus_ids[0]) === cursus).forEach(project => {
            projectsByCursus.push(project);
        });
        return projectsByCursus;
    };

    return (
        <View>
            <Text style={[styles.h3, styles.sectionsTitles]}>Select a cursus</Text>
            <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue={cursus}
                onValueChange={(itemValue) => {
                    setCursus(itemValue);
                    onCursusChange(itemValue);
                }
                }
            >
                {pickerData.map((item, index) => (
                    <Picker.Item key={index} label={item.label} value={item.value} />
                ))}
            </Picker>
            {isProjectInProgress() ? <Text style={[styles.h3, styles.sectionsTitles]}>In progress</Text> : null}
            {
                getProjectsByCursus().map((project, index) => {
                    if (project.status === 'in_progress') {
                        return (
                            <View key={index} style={styles.project}>
                                <Text style={styles.projectName}>{project.project.name}</Text>
                                <Text style={styles.projectStatus}>Status: In progress</Text>
                            </View>
                        );
                    }
                })
            }
            <Text style={[styles.h3, styles.sectionsTitles]}>Finished</Text>
            {
                getProjectsByCursus().map((project, index) => {
                    if (project.status === 'finished') {
                        return (
                            <View key={index} style={styles.project}>
                                <Text style={styles.projectName}>{project.project.name}</Text>
                                <Text style={styles.projectStatus}>Status: Finished</Text>
                                <View style={styles.finalMarkContainer}>
                                    <Text style={styles.finalMarkText}>Final mark: </Text>
                                    <Text style={[styles.projectMark, styles.greenText]}>{project.final_mark}</Text>
                                </View>
                            </View>
                        );
                    }
                })
            }
        </View >
    );
}

export default ProjectsList;

const styles = StyleSheet.create({
    h3: {
        color: 'black',
        fontSize: 20,
        fontFamily: 'Inter_900Black',
    },
    sectionsTitles: {
        marginLeft: 20,
        marginTop: 10,
    },
    picker: {
        height: 80,
        backgroundColor: "white",
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    pickerItem: {
        flex: 1,
        fontSize: 14,
    },
    project: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    projectName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    projectStatus: {
        fontSize: 15,
    },
    projectMark: {
        fontSize: 15,
    },
    greenText: {
        color: '#5cb85c',
    },
    finalMarkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    finalMarkText: {
        fontSize: 15,
    },
});