@isTest
private class TestCampaign{

	@testSetup static void setup(){

		Campaign__c campaignObj = new Campaign__c (
			Name = 'test value',
            Car_Model__c = 'a015i00000SdnfEAAR'
		);
		insert campaignObj;
		 
	}

	@isTest static void getAllCampaigns() {
        Test.startTest();
		Campaign.getAllCampaigns();
        Test.stopTest();
	}
}