import { LightningElement, track, wire } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import getAllCars from '@salesforce/apex/Car.getAllCars'
import { getProfilePermission } from 'c/utils';

export default class Car extends LightningElement {
    @track hasPermission = false
    @track hasNoPermission = false
    @track modalVisible = false
    @track mode
    @track carList
    @track selectedRecordId
    @track currentProfile = "System Administrator"

    actions = [
        { label: 'Edit', name: 'edit' },
        { label: 'Delete', name: 'delete' },
    ]
    
    columns = [
        {label: 'Name', fieldName: 'Name'},
        {
            type: 'action',
            typeAttributes: { rowActions: this.actions },
        },
    ]

    connectedCallback(){
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'delete':
                this.deleteRow(row);
                break;
            case 'edit':
                this.selectedRecordId = event.detail.row.Id
                this.openModal("edit")
                break;
            default:
        }
    }

    //On change user
    handleProfileChanged(event){
        this.currentProfile = event.detail
        //Check if current profile can view this tab
        if(getProfilePermission(event.detail).hasOwnProperty('car')){
            this.hasPermission = true
            this.hasNoPermission = false
        }
        else{
            this.hasPermission = false
            this.hasNoPermission = true
        }

        getAllCars().then(result => {
            this.carList = result
        }).catch(error => {
            const event = new ShowToastEvent({
                title: 'Error',
                variant: 'error',
                message: error.body.message,
            })

            this.dispatchEvent(event); 
        })
    }

    //CREATE OR EDIT AND CLOSE MODAL
    handleNewAction(event){
        this.openModal("create")
    }

    openModal(modeSelected){
        this.mode = modeSelected
        this.modalVisible = true
    }

    closeModal(){
        this.modalVisible = false
    }
}