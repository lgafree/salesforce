import { LightningElement, track} from 'lwc';
import {NavigationMixin} from 'lightning/navigation'
import getCases from '@salesforce/apex/searchCases.getCases';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class Case_detail extends LightningElement {
    @track casesRecord;
    searchValue = '';

    handleSearchKeyword() {
        this.searchValue = this.template.querySelector('lightning-input').value

        if (this.searchValue !== '') {
            getCases({
                    searchKey: this.searchValue
                })
                .then(result => {
                    this.casesRecord = result;
                })
                .catch(error => {
                   
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event); 
                    this.casesRecord = null;
                });               
        } else {
            const event = new ShowToastEvent({
                variant: 'error',
                message: 'Search text missing..',
            });
            this.dispatchEvent(event);
        }
    }

    navigateToAccount(e) {
        // this[NavigationMixin.Navigate]({
        //     type: 'standard__recordPage',
        //     attributes: {
        //         recordId: e.target.dataset.id,
        //     }
        // });
    }
}