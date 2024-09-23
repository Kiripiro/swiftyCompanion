import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const ErrorModal = ({ isVisible, errorMessage, onClose }) => {
    return (
        <Modal isVisible={isVisible}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{errorMessage}</Text>
                    <TouchableOpacity onPress={onClose} style={{ alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ color: 'blue' }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal >
    );
};

export default ErrorModal;