@isTest
private class TestCar{

	@testSetup static void setup(){

		Car__c carObj = new Car__c (
			Name = 'test value'
		);
		insert carObj;
		 
	}

	@isTest static void getAllCars() {
        Test.startTest();
		Car.getAllCars();
        Test.stopTest();
	}
}