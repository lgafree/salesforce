import { LightningElement, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import getCarModelsByStage from '@salesforce/apex/CarModel.getCarModelsByStage'
import insertBooking from '@salesforce/apex/Booking.insertBooking'
import { getProfilePermission } from 'c/utils';

export default class CarsDisplay extends LightningElement {
    @track hasPermission = false
    @track hasNoPermission = false
    @track isEditButtonVisible = false
    @track modalVisible = false
    @track isCustomerSelected = false
    @track mode
    @track carModelList
    @track selectCarModelId
    @track currentProfile
    @track currentCustomer

    //On Click Edit
    handleEditClick(event){
        this.selectCarModelId = event.target.dataset.id
        this.openModal("edit")  
    }

    //On change user
    handleProfileChanged(event){
        this.currentProfile = event.detail
        
        //check if customer is selected in profiles
        this.currentProfile == 'Customer' ? this.isCustomerSelected = true : this.isCustomerSelected = false

        //Check if current profile can view this tab
        if(getProfilePermission(event.detail).hasOwnProperty('carsDisplay')){
            this.hasPermission = true
            this.hasNoPermission = false

            //Check if current profile can edit record
            getProfilePermission(this.currentProfile)['carsDisplay']['edit'] ? this.isEditButtonVisible = true : this.isEditButtonVisible = false        
        
            //Load ready for launch car Models
            getCarModelsByStage({stage: 'Ready for launch'}).then(result => {
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
        else{
            this.hasPermission = false
            this.hasNoPermission = true
        }
    }

    //On Click Buy
    handleBuyClick(event){
        if(this.currentCustomer){
            // insertBooking({record: `${event.target.dataset.id.slice(0, 15)}, ${this.currentCustomer.slice(0,15)}`})
            insertBooking({carModelId: event.target.dataset.id, customerId: this.currentCustomer})
            .then(() => {
                const event = new ShowToastEvent({
                    title: 'Success',
                    variant: 'success',
                    message: 'Booking created',
                })
    
                this.dispatchEvent(event); 
            })
            .catch(error => {
                const event = new ShowToastEvent({
                    title: 'Error Booking',
                    variant: 'error',
                    message: error.body.message,
                })
    
                this.dispatchEvent(event);
            })
        }
        else{
            const event = new ShowToastEvent({
                title: 'Error',
                variant: 'error',
                message: 'No customer logged in.',
            })

            this.dispatchEvent(event); 
        }
    }

    //On change customer
    handleCustomerChanged(event){
        this.currentCustomer = event.detail
    }

    //open and close modal
    openModal(modeSelected){
        this.mode = modeSelected
        this.modalVisible = true
    }
    closeModal(){
        this.modalVisible = false
    }
}