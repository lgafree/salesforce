public with sharing class Car {
    @AuraEnabled(cacheable=true)
    public static list<Car__c> getAllCars() {
        list<Car__c> cars = [Select Fields(Standard) from Car__c];
        
        return cars;
    }
}
