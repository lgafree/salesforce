@isTest
public class TestBooking {
    @testSetup static void setup(){
        Booking__c bookingObj = new Booking__c (
            Car_Model__c = 'a015i00000SdnfEAAR',
			Customer__c = '0035i00000AoWM1AAN'
		);
        
		insert bookingObj;
    }
    
    @isTest static void getAllBookings() {
        Test.startTest();
		Booking.getAllBookings();
        Test.stopTest();
	}
    
    @isTest static void getBookingsByCustomer(){
        Test.startTest();
        Booking.getBookingsByCustomer('0035i00000AoWM1AAN');
        Test.stopTest();
    }
    
    @isTest static void insertBooking(){
        Test.startTest();
        Booking.insertBooking('a015i00000SdnfEAAR','0035i00000AoWM1AAN');
        Test.stopTest();
    }
}