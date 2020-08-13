import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Helper } from "../helpers/helper";
import { AppBusiness } from "../helpers/app-business";
import { Task } from "../types/Task";
import { Category } from "../types/Category";
import { confirmAlert } from "react-confirm-alert";

interface TasksState {
    id: number,
    tasks: Task[],
    filteredTasks: Task[],
    categories: Category[]
}

export class Tasks extends Component<any, TasksState> {

    appBusiness = new AppBusiness(this.props);
    helper = new Helper();
    tasksView: JSX.Element[] = [];
    categoriesView: JSX.Element[] = [];

    constructor(props: any) {
        super(props);
        this.initState();
        this.edit_Click = this.edit_Click.bind(this);
        this.goingToDelete = this.goingToDelete.bind(this);
        this.category_Change = this.category_Change.bind(this);
    }

    initState() {
        this.state = {
            id: 0,
            tasks: [],
            filteredTasks: [],
            categories: []
        };
    }

    componentDidMount() {
        this.appBusiness.GetUserTasks((response: TasksState) => {
            this.setState({
                tasks: response.tasks,
                filteredTasks: response.tasks,
                categories: response.categories
            })
        });
    }

    category_Change(event: any) {
        let categoryId: number = +event.target.value;
        let filteredTasks: Task[] = [];
        if (categoryId > 0) {
            filteredTasks = this.state.tasks.filter((task: Task) => {
                return task.categoryId === categoryId;
            });
        }
        else
            filteredTasks = this.state.tasks;

        this.setState({
            filteredTasks: filteredTasks
        });
    }

    edit_Click(event: any) {
        let id: number = +event.target.dataset.id;
        this.helper.redirectToPage('new-task/' + id);
    }

    delete_Click() {
        this.appBusiness.DeleteTask(this.state.id, (status: boolean, tasks: Task[]) => {
            if (status) {
                this.setState({
                    tasks: tasks,
                    filteredTasks: this.state.filteredTasks.filter((task: Task) => {
                        return task.id != this.state.id;
                    }),
                });
            }
        })
    }

    goingToDelete(event: any) {
        this.setState({ id: +event.target.dataset.id });
        confirmAlert({
            title: 'Confirmation',
            message: 'Are your sure to delete this?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => { true; this.delete_Click() }
                },
                {
                    label: 'Cancel',
                    onClick: () => true
                }
            ]
        });
    }

    render() {
        this.tasksView = this.state.filteredTasks.map((task: Task) => {
            return (
                <div className="col-md-6" key={task.id}>
                    <div className="card card-body text-primary">
                        <h5 className="card-title">
                            <span className="highlighted">{task.categoryName}</span> {task.name}
                            <span className="admin card-settings">
                                <i className="fa fa-edit" data-id={task.id} onClick={this.edit_Click}></i>
                                <i className="fa fa-remove" data-id={task.id} onClick={this.goingToDelete}></i>
                            </span>
                        </h5>
                        <p className="card-text">{task.description}</p>
                    </div>
                </div>
            );
        });

        if (this.state.categories) {
            this.categoriesView = this.state.categories.map((category: Category) => {
                return (
                    <option value={category.id} key={category.id}>{category.name}</option>
                )
            })
        }
        return (
            <section className="section-property section-t8">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="title-wrap d-flex justify-content-between">
                                <div className="title-box">
                                    <h2 className="title-a">Your Daily Tasks</h2>
                                </div>
                                <div className="title-link">
                                    <select className="custom-ddl" onChange={this.category_Change}>
                                        <option value={0} key={0}>All Categories</option>
                                        {this.categoriesView}
                                    </select>
                                    <div className="admin add-new">
                                        <NavLink className="nav-link add-new" to={'/new-task'}><i className="fa fa-plus"></i> Add new task</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row cards-container">
                        {this.tasksView}
                    </div>
                </div>
            </section>
        )
    }
}

export default Tasks;