import { LightningElement, api, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

import getAllContacts from '@salesforce/apex/Contacts.getAllContacts'

export default class Customer extends LightningElement {
    @api value = 'inProgress';
    @track options

    connectedCallback() {
        var contactList = []
        getAllContacts().then(result => {
            result.forEach(contact => {
                contactList.push({label: `${contact['FirstName']} ${contact['LastName']}`, value: contact['Id']})
            });
            this.options = contactList
        }).catch(error => {
            const event = new ShowToastEvent({
                title: 'Error',
                variant: 'error',
                message: error.body.message,
            })

            this.dispatchEvent(event); 
        })
    }

    handleChange(event) {
        this.value = event.detail.value

        const selectedCustomer = new CustomEvent("customerchanged", {detail: this.value})

        this.dispatchEvent(selectedCustomer)
    }
}