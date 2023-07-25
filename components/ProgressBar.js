import React from 'react';
import { View, Text } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const MyProgressBar = ({ value, color }) => {
    let decimalValue = (value.toString().split('.')[1]) || 0;
    const progress = parseFloat("0." + decimalValue);

    if (decimalValue.toString().length < 2) {
        decimalValue = decimalValue * 10;
    } else if (decimalValue.toString().startsWith('0')) {
        decimalValue = decimalValue.substring(1);
    }

    return (
        <View>
            <ProgressBar
                progress={progress}
                color={color}
                style={{ height: 25, backgroundColor: 'white', marginBottom: 10, width: '100%' }}
            />
            <Text style={{ position: 'absolute', alignSelf: 'center', marginTop: 3 }}>
                Level {value.toString().split('.')[0]} - {decimalValue}%
            </Text>
        </View >
    );
};

export default MyProgressBar;