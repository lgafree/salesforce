public with sharing class Accounts {
    @AuraEnabled(cacheable=true)
    public static list<Account> getAllAccounts() {
        list<Account> accounts = [Select Fields(Standard) from Account];
        
        return accounts;
    }
}
