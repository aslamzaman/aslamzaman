import * as Realm from "realm-web";


export const fetchData = async (email, userId) => {
    try {
        const app = new Realm.App({ id: process.env.NEXT_PUBLIC_APP_ID });
        const credentials = Realm.Credentials.anonymous();
        const user = await app.logIn(credentials);
        const data = await user.functions.getOne(email, userId);
        return { data: data || null };
    } catch (err) {
        console.error(`Failed to fetch from remote database`, err);
        return null;
    }
};


export const fetchAll = async () => {
    const user_id = process.env.NEXT_PUBLIC_USER_ID;
    try {
        const app = new Realm.App({ id: process.env.NEXT_PUBLIC_APP_ID });
        const credentials = Realm.Credentials.anonymous();
        const user = await app.logIn(credentials);
        const data = await user.functions.getAll(user_id);
        return { data: data || null };
    } catch (err) {
        console.error(`Failed to fetch from remote database`, err);
        return null;
    }
};



//------------------------------------------------------------------------

const fetchUserData = async (appId, dataType) => {
    const userId = parseInt(sessionStorage.getItem("login"));
    if (userId) {
        try {
            const app = new Realm.App({ id: appId });
            const credentials = Realm.Credentials.anonymous();
            const user = await app.logIn(credentials);
            const data = await user.functions.GetOne(userId);
            return data;
        } catch (err) {
            console.error(`Failed to fetch ${dataType} from remote database`, err);
            return [];
        }
    } else {
        let localData = localStorage.getItem(dataType);
        if (!localData) {
            return [];
        } else {
            return JSON.parse(localData);
        }
    }
};

const updateUserData = async (appId, dataType, data) => {
    const userId = parseInt(sessionStorage.getItem("login"));
    if (userId) {
        try {
            const app = new Realm.App({ id: appId });
            const credentials = Realm.Credentials.anonymous();
            const user = await app.logIn(credentials);
            await user.functions.UpdateOne(userId, data);
            return { success: true };
        } catch (error) {
            console.error(error);
            return { success: false, message: `Failed to update ${dataType}` };
        }
    } else {
        localStorage.setItem(dataType, JSON.stringify(data));
        return { success: true };
    }
};




