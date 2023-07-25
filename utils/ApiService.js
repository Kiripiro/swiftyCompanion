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
                const level = data.cursus_users.find(cursus => cursus.cursus_id === 21).level;
                const user = {
                    login: data.login,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    profilePicture: data.image.link,
                    campus: data.campus[0].name,
                    pool_year: data.pool_year,
                    kind: data.kind,
                    level: level,
                    skills: data.cursus_users.find(cursus => cursus.cursus_id === 21).skills,
                }
                return user;
            } else if (response.status === 401) {
                throw new Error('Invalid access token');
            } else if (response.status === 404) {
                throw new Error('User doesn\'t exist');
            } else {
                throw new Error('Failed to fetch user data');
            }
        } catch (error) {
            throw error;
        }
    }

    async getUserProjects(token, login) {
        try {
            const response = await fetch(`https://api.intra.42.fr/v2/users/${login}/projects_users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            });

            if (response.status === 200) {
                const data = await response.json();
                const projects = data.map(project => {
                    return {
                        name: project.project.name,
                        status: project.status,
                        finalMark: project.final_mark,
                        validated: project.validated,
                    }
                });
                return projects;
            } else if (response.status === 401) {
                throw new Error('Invalid access token');
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
                return {
                    name: data[0].name,
                    score: data[0].score,
                    color: data[0].color,
                    cover: data[0].cover_url,
                }
            } else if (response.status === 401) {
                throw new Error('Invalid access token');
            } else {
                throw new Error('Failed to fetch user data');
            }
        } catch (error) {
            throw error;
        }
    }
}

export default new ApiService();