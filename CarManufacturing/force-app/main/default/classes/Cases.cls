public with sharing class Cases {
    @AuraEnabled(cacheable=true)
    public static list<Case__c> getAllCases() {
        list<Case__c> cases = [Select Fields(Standard) from Case__c];
        
        return cases;
    }
}