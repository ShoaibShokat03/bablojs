export const api = {
    baseUrl: "http://localhost/apps/js/BABLOJS/api",
    endpoints: {
        signup: () => `${api.baseUrl}/signup`,
        login: () => `${api.baseUrl}/login`,
        logout: () => `${api.baseUrl}/logout`,
        userProfile: () => `${api.baseUrl}/profile`,
        userUpdate: () => `${api.baseUrl}/update-profile`,
    },
}