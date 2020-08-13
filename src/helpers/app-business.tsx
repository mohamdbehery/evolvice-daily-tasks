import { AppBase } from './app-base';
import { User } from '../types/User';
import { Task } from '../types/Task';
import { Category } from '../types/Category';
import { Helper } from './helper';

export class AppBusiness extends AppBase {
    helper = new Helper();

    Login(user: User, callBack: Function) {
        this.FetchJSON('users', (response: User[]) => {
            let foundedUser: User = response.find((item: User) => {
                return item.username.toLowerCase() === user.username.toLowerCase() && item.password === user.password;
            })!;
            callBack(foundedUser);
        });
    };

    GetCategories(callBack: Function) {
        this.FetchJSON('categories', (response: Category[]) => {
            callBack(response);
        })
    }

    /**
     * get user tasks from local storage otherwise from json file
     * @param callBack 
     */
    GetUserTasks(callBack: Function) {
        let user: User = this.helper.getLoggedInUser();
        if (user) {
            let storageTasks: Task[] = this.helper.getFromLocalStorage('tasks');
            let storageCategories: Category[] = this.helper.getFromLocalStorage('categories');
            if (storageTasks) {
                callBack({
                    tasks: storageTasks,
                    categories: storageCategories
                });
            }
            else {
                this.FetchJSON('tasks', (tasks: Task[]) => {
                    this.FetchJSON('categories', (categories: Category[]) => {
                        let foundedTasks: any = [];
                        for (let task of tasks) {
                            if (task.userId == user.id) {
                                let taskCat: Category = categories.find((cat: Category) => cat.id === task.categoryId)!;
                                foundedTasks.push({
                                    ...task,
                                    categoryName: taskCat.name,
                                });
                            }
                        }

                        this.helper.setToLocalStorage("tasks", foundedTasks);
                        this.helper.setToLocalStorage("categories", categories);
                        callBack({
                            tasks: foundedTasks,
                            categories: categories
                        });
                    });
                });
            }
        }
        else {
            callBack(null);
        }
    }

    /**
     * to delete task by id from localstorage tasks
     * @param id 
     * @param callBack 
     */
    DeleteTask(id: number, callBack: Function) {
        let storageTasks: Task[] = this.helper.getFromLocalStorage('tasks');
        let newTasks: Task[] = storageTasks.filter((task: Task) => {
            return task.id != id;
        });

        this.helper.setToLocalStorage("tasks", newTasks);
        callBack(true, newTasks);
    }

    /**
     * if task object has id value then procced with edit otherwise add this task
     * @param task 
     * @param callBack 
     */
    SaveTask(task: Task, callBack: Function) {
        let categories: Category[] = this.helper.getFromLocalStorage('categories');
        if (task.categoryId > 0) {
            let cat: Category = categories.find((item: Category) => { return item.id == task.categoryId })!;
            task.categoryName = cat.name;
        }
        let user: User = this.helper.getLoggedInUser();
        task.userId = user.id;

        let storageTasks: Task[] = this.helper.getFromLocalStorage('tasks');
        let newTasks: Task[] = [];
        if (task.id > 0) {
            for (let item of storageTasks) {
                if (item.id == task.id)
                    newTasks.push(task);
                else
                    newTasks.push(item);
            }
        }
        else {
            let maxid: number = 0;
            storageTasks.map(function (obj: Task) {
                if (obj.id > maxid) maxid = obj.id;
            });
            task.id = maxid + 1;

            storageTasks.push(task);
            newTasks = storageTasks;
        }

        this.helper.setToLocalStorage("tasks", newTasks);
        callBack(true, newTasks);
    }

    GetTask(id: number, callBack: Function) {
        let storageTasks: Task[] = this.helper.getFromLocalStorage('tasks');
        let task: Task = storageTasks.find((item: Task) => {
            return item.id === id
        })!;
        callBack(task);
    }
}
