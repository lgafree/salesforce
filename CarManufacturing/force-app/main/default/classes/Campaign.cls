public with sharing class Campaign {
    @AuraEnabled(cacheable=true)
    public static list<Campaign__c> getAllCampaigns() {
        list<Campaign__c> campaigns = [Select Fields(Standard) from Campaign__c];
        
        return campaigns;
    }
}