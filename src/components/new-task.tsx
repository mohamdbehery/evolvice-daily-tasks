import React, { Component } from "react";
import Button from "../styled-components/button";
import TextArea from "../styled-components/textarea";
import Input from "../styled-components/input";
import Select from "../styled-components/select";
import { Helper } from "../helpers/helper";
import { Task } from "../types/Task";
import { AppBusiness } from "../helpers/app-business";
import { confirmAlert } from "react-confirm-alert";
import { Category } from "../types/Category";

interface NewTaskState {
    task: Task,
    categories: Category[]
}

export class NewTask extends Component<any, NewTaskState> {

    categoriesView: JSX.Element[] = [];
    helper = new Helper();
    appBusiness = new AppBusiness(this.props);

    constructor(props: any) {
        super(props);
        this.initState();
        this.name_Change = this.name_Change.bind(this);
        this.description_Change = this.description_Change.bind(this);
        this.category_Change = this.category_Change.bind(this);
        this.save_Click = this.save_Click.bind(this);
    }

    initState() {
        this.state = {
            task: {
                id: (this.props.match.params && this.props.match.params.id) ? +this.props.match.params.id : 0,
                categoryId: 0,
                categoryName: '',
                name: '',
                description: ''
            },
            categories: []
        };
    }

    componentDidMount() {
        this.appBusiness.GetCategories((categories: Category[]) => {
            this.setState({
                categories: categories
            });
        });

        if (this.state.task.id > 0) {
            this.appBusiness.GetTask(this.state.task.id, (task: Task) => {
                if (task) {
                    this.setState({ task });
                }
            })
        }
    }

    name_Change(event: any) {
        this.setState({
            task: {
                ...this.state.task,
                name: event.target.value
            }
        });
    }

    description_Change(event: any) {
        this.setState({
            task: {
                ...this.state.task,
                description: event.target.value
            }
        });
    }

    category_Change(event: any) {
        this.setState({
            task: {
                ...this.state.task,
                categoryId: +event.target.value
            }
        });
    }

    save_Click() {
        let newTask: Task = this.state.task;
        if (newTask && newTask.name && newTask.categoryId > 0 && newTask.description) {
            this.appBusiness.SaveTask(newTask, (status: boolean) => {
                if (status)
                    this.helper.redirectToPage('tasks');
            });
        }
        else {
            confirmAlert({
                title: 'Data required',
                message: 'Please enter all required fields',
                buttons: [
                    {
                        label: 'Ok',
                        onClick: () => true
                    }
                ]
            });
        }
    }

    hendleEnterKey(e: any) {
        if (e.key == 'Enter')
            this.save_Click();
    }

    render() {
        if (this.state.categories.length > 0) {
            this.categoriesView = this.state.categories.map((item: Category) => {
                return (<option value={item.id} key={item.id}>{item.name}</option>);
            });
        }
        return (
            <section className="section-property section-t8">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="title-wrap d-flex justify-content-between">
                                <div className="title-box">
                                    <h2 className="title-a">Task Control</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" onKeyPress={this.hendleEnterKey.bind(this)}>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <Select value={this.state.task.categoryId} onChange={this.category_Change}>
                                    <option value={0} key={0}>Task category</option>
                                    {this.categoriesView}
                                </Select>
                                <div className="validation"></div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="form-group">
                                <Input type="text" name="title" placeholder="Task title" value={this.state.task.name} onChange={this.name_Change} />
                                <div className="validation"></div>
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <div className="form-group">
                                <TextArea name="description" placeholder="Task description" value={this.state.task.description} onChange={this.description_Change}></TextArea>
                                <div className="validation"></div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <Button type="submit" onClick={this.save_Click}>Save</Button>
                            <Button onClick={() => this.helper.redirectToPage('tasks')}>Cancel</Button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default NewTask;