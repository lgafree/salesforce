@isTest
private class TestAccounts{

	@testSetup static void setup(){

		Account accountObj = new Account (
			Name = 'test value'
		);
		insert accountObj;
		 
	}

	@isTest static void testMethod1() {
		// code_block	
	}

	@isTest static void testMethod2() {
		// code_block	
	}
}