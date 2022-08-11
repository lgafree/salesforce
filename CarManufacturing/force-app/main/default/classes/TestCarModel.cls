@isTest
public class TestCarModel {
	@testSetup static void setup(){        
		Car_Model__c carModelObj = new Car_Model__c (
			Name = 'test value',
            Car__c = 'a005i000007UJAAAA4'
		);
		insert carModelObj;
	}
    
    @isTest static void getAllCarModels() {
        Test.startTest();
		CarModel.getAllCarModels();
        Test.stopTest();
	}
    
    @isTest static void getCarModelsByStage() {
        Test.startTest();
		CarModel.getCarModelsByStage('');
        Test.stopTest();
	}
    
    @isTest static void getCarModel() {
        Test.startTest();
		CarModel.getCarModel([Select Id from Car_Model__c].Id);
        Test.stopTest();
	}
}