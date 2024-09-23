class ApiService {
    async getUserData(token, login) {
        try {
            const response = await fetch(`https://api.intra.42.fr/v2/users/${login}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            });

            if (response.status === 200) {
                const data = await response.json();
                const user = {
                    login: data.login,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    profilePicture: data.image.link,
                    wallet: data.wallet,
                    campus: data.campus[0].name,
                    pool_year: data.pool_year,
                    kind: data.kind,
                    level: data.cursus_users.find(cursus => cursus.cursus_id === 21)?.level || 0,
                    levelPiscine: data.cursus_users.find(cursus => cursus.cursus_id === 9)?.level || 0,
                    skills: data.cursus_users.find(cursus => cursus.cursus_id === 21)?.skills || [],
                    projects: data.projects_users,
                }
                return user;
            } else if (response.status === 401) {
                throw new Error('Invalid access token');
            } else if (response.status === 404) {
                throw new Error('User doesn\'t exist');
            } else if (response.status >= 500) {
                throw new Error('Intranet unvailable');
            } else {
                throw new Error('Failed to fetch user data');
            }
        } catch (error) {
            throw error;
        }
    }

    async getUserCoalition(token, login) {
        try {
            const response = await fetch(`https://api.intra.42.fr/v2/users/${login}/coalitions`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            });

            if (response.status === 200) {
                const data = await response.json();

                const coalitions = data.map((coalition) => {
                    const isPiscine = coalition.slug.toLowerCase().includes('piscine');
                    return {
                        name: coalition.name,
                        color: coalition.color,
                        cover: coalition.cover_url,
                        image: coalition.image_url,
                        cursus: isPiscine ? 9 : 21,
                    };
                });

                return coalitions;
            } else if (response.status === 401) {
                throw new Error('Invalid access token');
            } else if (response.status === 404) {
                throw new Error('User doesn\'t exist');
            } else if (response.status >= 500) {
                throw new Error('Intranet unvailable');
            } else {
                throw new Error('Failed to fetch user data');
            }
        } catch (error) {
            throw error;
        }
    }
}

export default new ApiService();