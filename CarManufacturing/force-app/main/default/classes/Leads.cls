public with sharing class Leads {
    @AuraEnabled(cacheable=true)
    public static list<Lead> getAllLeads() {
        list<Lead> leads = [Select Fields(Standard) from Lead];
        
        return leads;
    }
}