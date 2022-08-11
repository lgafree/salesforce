public with sharing class Contacts {
    @AuraEnabled(cacheable=true)
    public static list<Contact> getAllContacts() {
        list<Contact> contacts = [Select Fields(Standard) from Contact];
        
        return contacts;
    }
}
