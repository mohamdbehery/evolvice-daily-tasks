import { Helper } from './helper';
import axios from 'axios';
import { Component } from 'react';
import { confirmAlert } from "react-confirm-alert";

export class AppBase extends Component {
    helper = new Helper();

    /**
     * using axios to fetch a json file
     * @param fileName 
     * @param callBack 
     */
    FetchJSON(fileName: string, callBack: Function) {
        axios.get('../data/' + fileName + '.json')
            .then((response: any) => {
                callBack(response.data);
            }).catch((error: any) => {
                console.log(error);
                this.FireError();
            })
    }

    /**
     * to show a friendly message for user when exception fires
     */
    FireError() {
        confirmAlert({
            title: 'System Failure',
            message: 'Something went wrong, please contact the technical support, sorry for this inconvenience',
            buttons: [
                {
                    label: 'No problem, i will try again later.',
                    onClick: () => true
                }
            ]
        });
    }
}