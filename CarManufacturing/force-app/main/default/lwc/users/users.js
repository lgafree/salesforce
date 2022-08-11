import { LightningElement, api } from 'lwc';

export default class Users extends LightningElement {
    @api value = 'inProgress';

    get options() {
        return [
            { label: 'System Administrator', value: 'System Administrator' },
            { label: 'Company Executive', value: 'Company Executive' }, 
            { label: 'Factory Executive', value: 'Factory Executive' },
            { label: 'Quality Analyst', value: 'Quality Analyst' },
            { label: 'Sales Executive', value: 'Sales Executive' },
            { label: 'Digital Marketers', value: 'Digital Marketers' },
            { label: 'Car Dealers', value: 'Car Dealers' },
            { label: 'Customer Service Representative', value: 'Customer Service Representative' },
            { label: 'Regional Head', value: 'Regional Head' },
            { label: 'Customer', value: 'Customer'}
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;

        const selectedProfile = new CustomEvent("profilechanged", {detail: this.value})

        this.dispatchEvent(selectedProfile)
    }
}