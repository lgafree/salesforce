import { LightningElement, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import getAllBookings from '@salesforce/apex/Booking.getAllBookings'
import getBookingsByCustomer from '@salesforce/apex/Booking.getBookingsByCustomer'
import { getProfilePermission } from 'c/utils';

export default class Booking extends LightningElement {
    @track hasPermission = false
    @track hasNoPermission = false
    @track modalVisible = false
    @track mode
    @track bookingList
    @track selectedRecordId
    @track currentCustomer
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

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'delete':
                this.deleteRow(row);
                break;
            case 'edit':
                this.selectedRecordId = event.detail.row.Id
                if(getProfilePermission(this.currentProfile)['booking']['edit']){
                    this.openModal("edit")         
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
        this.currentProfile = event.detail
        //check if customer is selected in profiles
        this.currentProfile == 'Customer' ? this.isCustomerSelected = true : this.isCustomerSelected = false

        //Check if current profile can view this tab
        if(getProfilePermission(event.detail).hasOwnProperty('booking')){
            this.hasPermission = true
            this.hasNoPermission = false
        }
        else{
            this.hasPermission = false
            this.hasNoPermission = true
        }

        //Check if admin or Regional Head
        if(this.currentProfile == 'System Administrator' || this.currentProfile == 'Regional Head'){
            getAllBookings().then(result => {
                this.bookingList = result
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

    //On change customer
    handleCustomerChanged(event){
        this.currentCustomer = event.detail
        getBookingsByCustomer({customerId: this.currentCustomer}).then(result => {
            this.bookingList = result
        }).catch(error => {
            const event = new ShowToastEvent({
                title: 'Error',
                variant: 'error',
                message: error.body.message
            })

            this.dispatchEvent(event); 
        })
    }

    //EDIT AND CLOSE MODAL
    openModal(modeSelected){
        this.mode = modeSelected
        this.modalVisible = true
    }

    closeModal(){
        this.modalVisible = false
    }
}