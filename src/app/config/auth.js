import Config from "./config.js";

export const auth = {
    isLogged: () => !!Config.storage.get(Config.session.userProfile),

    user: () =>
        Config.isLogged()
            ? JSON.parse(Config.storage.get(Config.session.userProfile))
            : { username: "Guest", email: "" },

    login: async (data) => {
        Config.storage.set(Config.session.accessToken, data.access_token ?? "dummy_access_token");
        Config.storage.set(Config.session.refreshToken, data.refresh_token ?? "dummy_refresh_token");
        Config.storage.set(Config.session.userRoleKey, data.role);
        Config.storage.set(Config.session.userProfile, JSON.stringify(data.user ?? data));
        Config.storage.set(Config.session.timeout, data.timeout);
    },

    logout: async () => {
        Config.storage.remove(Config.session.accessToken);
        Config.storage.remove(Config.session.refreshToken);
        Config.storage.remove(Config.session.userRoleKey);
        Config.storage.remove(Config.session.userProfile);
        Config.storage.remove(Config.session.timeout);
        router.go("/login");
    },
}