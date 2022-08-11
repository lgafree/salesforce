public with sharing class Booking {
    @AuraEnabled(cacheable=true)
    public static list<Booking__c> getAllBookings() {
        list<Booking__c> bookings = [Select Name from Booking__c];
        
        return bookings;
    }

    @AuraEnabled(cacheable=true)
    public static list<Booking__c> getBookingsByCustomer(String customerId) {
        List<Booking__c> bookings = [Select Name from Booking__c Where Customer__c=:customerId];
        
        return bookings;
    }

    @AuraEnabled
    public static Void insertBooking(String carModelId, String customerId){
        //Select Car Dealer Profile
        Id carDealer = [SELECT Id FROM User Where ProfileId = '00e5i000000MoYgAAK' LIMIT 1].Id;

        Booking__c booking = new Booking__c(Car_Model__c=carModelId,
                                            Customer__c=customerId,
                                            Car_Dealer__c=carDealer);
        
        try{
            insert booking;
        }
        catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
}
