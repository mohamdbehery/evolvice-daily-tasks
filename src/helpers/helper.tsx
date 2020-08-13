import { User } from "../types/User";

export class Helper {

    getFromLocalStorage = function (key: string) {
        if (localStorage.PersistentData && JSON.parse(localStorage.PersistentData)[key])
            return JSON.parse(localStorage.PersistentData)[key];
        else
            return undefined;
    }

    setToLocalStorage(key: string, value: any) {
        let data: any = {};
        if (localStorage.PersistentData)
            data = JSON.parse(localStorage.PersistentData);

        data[key] = value;
        localStorage.PersistentData = JSON.stringify(data);
    }

    removeFromLocalStorage = function (key: string) {
        let data: any = {};
        if (localStorage.PersistentData)
            data = JSON.parse(localStorage.PersistentData);

        data[key] = undefined;
        localStorage.PersistentData = JSON.stringify(data);
    }

    getLoggedInUser(): User{
        return this.getFromLocalStorage('userData');
    }

    redirectToPage(pageName: string) {
        window.location.href = '/#/' + pageName;
    }
}