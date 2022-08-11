import { LightningElement, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import getAllCarModels from '@salesforce/apex/CarModel.getAllCarModels'
import getCarModelsByStage from '@salesforce/apex/CarModel.getCarModelsByStage'
import getCarModel from '@salesforce/apex/CarModel.getCarModel'
import { getProfilePermission } from 'c/utils';

export default class CarModel extends LightningElement {
    @track hasPermission = false
    @track hasNoPermission = false
    @track isNewButtonVisible = false
    @track modalVisible = false
    @track mode
    @track carModelList
    @track selectedRecordId
    @track currentProfile = 'System Administrator'
    
    actions = [
        { label: 'Edit', name: 'edit' },
        { label: 'Delete', name: 'delete' },
    ]
    
    columns = [
        {label: 'Name', fieldName: 'Name'},
        {label: 'Stage', fieldName: 'Stage__c'},
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
                if(getProfilePermission(this.currentProfile)['carModel']['edit']){
                    getCarModel({id: event.detail.row.Id}).then(result=>{
                        if(['Manufactured', 'Ready for launch'].includes(result['Stage__c']) && this.currentProfile == 'Factory Executive'){
                            const toastEvent = new ShowToastEvent({
                                title:"Access Denied",
                                message: "You can't edit at this stage.",
                                variant: "error"
                            })
                            this.dispatchEvent(toastEvent)
                        } 
                        else{
                            this.openModal("edit")
                        }
                    })               
                }
                else{
                    const toastEvent = new ShowToastEvent({
                        title:"Access Denied",
                        message: "You don't have enough permission to do this action.",
                        variant: "error"
                    })
                    this.dispatchEvent(toastEvent)
                }
                break;
            default:
        }
    }

     //On change user
    handleProfileChanged(event){
        //Check if current profile can view this tab
        this.currentProfile = event.detail
        if(getProfilePermission(this.currentProfile).hasOwnProperty('carModel')){
            this.hasPermission = true
            this.hasNoPermission = false

            //Check if current profile can create record
            getProfilePermission(this.currentProfile)['carModel']['create'] ? this.isNewButtonVisible = true : this.isNewButtonVisible = false        

            //Check if user has viewAll else get records by stage
            if(getProfilePermission(this.currentProfile)['carModel']['viewAll']){
                getAllCarModels().then(result => {
                    this.carModelList = result
                }).catch(error => {
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    })
        
                    this.dispatchEvent(event); 
                    this.casesRecord = null;
                })
            }
            else{
                getCarModelsByStage({stage: 'Manufactured'}).then(result => {
                    this.carModelList = result
                }).catch(error => {
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    })
        
                    this.dispatchEvent(event); 
                })
            }
        }
        else{
            this.hasPermission = false
            this.hasNoPermission = true
        }
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