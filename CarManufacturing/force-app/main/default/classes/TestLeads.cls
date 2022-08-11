@isTest
private class TestLeads{

	@testSetup static void setup(){

		Lead leadObj = new Lead (
			LastName = 'test value',
            Company = 'test'
		);
		insert leadObj;
		 
	}

	@isTest static void getAllLeads() {
        Test.startTest();
		Leads.getAllLeads();
        Test.stopTest();
	}
}