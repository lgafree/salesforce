@isTest
private class TestAccounts{

	@testSetup static void setup(){

		Account accountObj = new Account (
			Name = 'test value'
		);
		insert accountObj;
		 
	}

	@isTest static void getAllAccounts() {
        Test.startTest();
		Accounts.getAllAccounts();
        Test.stopTest();
	}
}