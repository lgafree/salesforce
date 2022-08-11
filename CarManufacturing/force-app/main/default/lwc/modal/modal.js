import { LightningElement, api, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
import CAR_MODEL_OBJECT from '@salesforce/schema/Car_Model__C'
import CAR_OBJECT from '@salesforce/schema/Car__C'
import CAMPAIGN_OBJECT from '@salesforce/schema/Campaign__C'
import BOOKING_OBJECT from '@salesforce/schema/Booking__C'
import CASE_OBJECT from '@salesforce/schema/Case__C'
import LEAD_OBJECT from '@salesforce/schema/Lead'
import ACCOUNT_OBJECT from '@salesforce/schema/Account'
import CONTACT_OBJECT from '@salesforce/schema/Contact'

export default class Modal extends LightningElement {
    @api title
    @api objectApiName
    @api mode
    @api recordId
    @api currentProfile
    @track isCreate = false
    @track isEdit = false

    connectedCallback(){
        //Check current object
        if(this.title == "Car"){
            this.objectApiName = CAR_OBJECT
        }
        else if (this.title == "Car Model"){
            this.objectApiName = CAR_MODEL_OBJECT
        }
        else if (this.title == "Campaign"){
            this.objectApiName = CAMPAIGN_OBJECT
        }
        else if (this.title == "Lead"){
            this.objectApiName = LEAD_OBJECT
        }
        else if (this.title == "Account"){
            this.objectApiName = ACCOUNT_OBJECT
        }
        else if (this.title == "Contact"){
            this.objectApiName = CONTACT_OBJECT
        }
        else if (this.title == 'Booking'){
            this.objectApiName = BOOKING_OBJECT
        }
        else if (this.title == 'Case'){
            this.objectApiName = CASE_OBJECT
        }

        //check if create or edit
        if(this.mode == "create"){
            this.isCreate = true
        }
        else if(this.mode == "edit"){
            this.isEdit = true
        }
    }

    closeModal(){
        this.dispatchEvent(new CustomEvent('close'))
    }

    handleSubmit(event){
        if(this.mode == 'edit' && this.currentProfile == 'Quality Analyst'){
            event.stopPropagation()
            event.preventDefault() 
            const fields = event.detail.fields            

            if(fields.Stage__c == 'Ready for launch' && !fields.QSC__c){
                const toastEvent = new ShowToastEvent({
                    title:"Error ",
                    message: "You can't set this to Ready for launch stage if QSC is not attached!",
                    variant: "error"
                })
                this.dispatchEvent(toastEvent)     
            }
            else{
                this.template.querySelector('lightning-record-form[data-id=edit]').submit(fields)
            }
        }
    }

    handleSuccess(event){
        const toastEvent = new ShowToastEvent({
            title: this.title + " has been saved",
            message: this.title + " ID: " + event.detail.id,
            variant: "success"
        })
        this.dispatchEvent(toastEvent)        
    }
}