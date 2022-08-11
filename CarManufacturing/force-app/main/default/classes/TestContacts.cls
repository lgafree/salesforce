@isTest
private class TestContacts{

	@testSetup static void setup(){

		Contact contactObj = new Contact (
			LastName = 'test value'
		);
		insert contactObj;
		 
	}

	@isTest static void getAllContacts() {
        Test.startTest();
		Contacts.getAllContacts();
        Test.stopTest();
	}
}