public with sharing class CarModel {
    @AuraEnabled(cacheable=true)
    public static list<Car_Model__c> getAllCarModels() {
        list <Car_Model__c> carModels = [Select Id, 
                                                Name, 
                                                Stage__c, 
                                                Car__c, 
                                                Image__c,
                                                Price__c 
                                        From Car_Model__C Order By CreatedDate Desc];

        return carModels;
    }

    @AuraEnabled(cacheable=true)
    public static list<Car_Model__c> getCarModelsByStage(String stage){
        list <Car_Model__c> carModels = [Select Id, 
                                                Name, 
                                                Stage__c, 
                                                Car__c, 
                                                Image__c,
                                                Price__c
                                        From Car_Model__C Where Stage__c = :stage Order By CreatedDate Desc];

        return carModels;
    }

    @AuraEnabled(cacheable=true)
    public static Car_Model__c getCarModel(String id){
        return [Select Id, Name, Stage__c, Car__c From Car_Model__C Where Id = :id Order By CreatedDate];
    }
}