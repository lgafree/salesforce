public with sharing class Profile {
    @AuraEnabled(cacheable=true)
    public static boolean getCurrentProfileName(String profiles) {
        List<String> listProfiles = profiles.split(',');    
    	Set<String> setProfiles = new Set<String>();
		setProfiles.addAll(listProfiles);
        
       return setProfiles.contains([select name from Profile where id = :UserInfo.getProfileId()].name);
    }
}