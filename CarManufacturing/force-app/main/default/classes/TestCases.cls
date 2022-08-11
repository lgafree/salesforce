@isTest
private class TestCases{

	@testSetup static void setup(){

		Case__c caseObj = new Case__c (
			Booking__c = 'a035i000002srguAAA'
		);
		insert caseObj;
		 
	}

	@isTest static void getAllCases() {
        Test.startTest();
		Cases.getAllCases();
        Test.stopTest();
	}
}