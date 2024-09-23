import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const MyProgressBar = ({ value, color }) => {
    const [progress, setProgress] = useState(0);
    const [decimalValue, setDecimalValue] = useState(0);

    useEffect(() => {
        let decimalPart = value.toString().split('.')[1] || '0';
        
        if (decimalPart.length < 2) {
            decimalPart = decimalPart * 10;
        } else if (decimalPart.startsWith('0')) {
            decimalPart = decimalPart.substring(1);
        }

        setDecimalValue(decimalPart);
        setProgress(parseFloat('0.' + decimalPart));
    }, [value]);

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
        </View>
    );
};

export default MyProgressBar;
