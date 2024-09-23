import AsyncStorage from '@react-native-async-storage/async-storage';
import { CLIENT_ID, SECRET } from "@env"

class TokenManager {
    async getTokenInfo() {
        try {
            let token = await AsyncStorage.getItem('token');
            if (token) {
                const isTokenValid = await this.isTokenValid(JSON.parse(token));
                if (isTokenValid) {
                    return token;
                } else {
                    const newToken = await this.fetchNewToken();
                    await this.saveToken(newToken);
                    return newToken;
                }
            } else {
                const newToken = await this.fetchNewToken();
                await this.saveToken(newToken);
                return newToken;
            }
        } catch (error) {
            throw new Error('Error retrieving or generating token:', error);
        }
    }

    async isTokenValid(token) {
        if (!token) {
            throw new Error('No token provided');
        }
        const tokenExpiration = token.created_at + 7200;
        const currentTime = Math.floor(Date.now() / 1000);
        if (tokenExpiration < currentTime) {
            return false;
        }
        return true;
    }

    async fetchNewToken() {
        try {
            let client_id = CLIENT_ID;
            let client_secret = SECRET;

            if (!client_id || !client_secret) {
                throw new Error('Missing .env data');
            }

            const response = await fetch("https://api.intra.42.fr/oauth/token", {
                body: "grant_type=client_credentials&client_id=" + client_id + "&client_secret=" + client_secret,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST"
            });

            if (response.ok) {
                const data = await response.json();
                return JSON.stringify(data);
            } else {
                throw new Error('Failed to fetch new token');
            }
        } catch (error) {
            throw error;
        }
    }

    async saveToken(token) {
        try {
            await AsyncStorage.setItem('token', token);
        } catch (error) {
            throw error;
        }
    }

    async deleteToken() {
        try {
            await AsyncStorage.removeItem('token');
        } catch (error) {
            throw error;
        }
    }
}

export default new TokenManager();