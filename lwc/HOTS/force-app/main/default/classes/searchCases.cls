public with sharing class searchCases {
    @AuraEnabled(cacheable=true)
    public static list<Case> getCases(string searchKey) {
        string searchKeyword = '%' + searchKey + '%';

        list<Case> caseListRecord = new list<Case>();

        for(Case caseObj : [Select Id,
                                CaseNumber,
                                Subject,
                                Account.Id,
                                Account.Name,
                                Account.Phone,
                                Account.Industry,
                                Account.Type,
                                Contact.Id,
                                Contact.Name,
                                Contact.Phone,
                                Contact.Email 
                            From Case WHERE Subject Like : searchKeyword]){

            caseListRecord.add(caseObj);
        }

        if(caseListRecord.size()==0){
            throw new AuraHandledException('No Record Found..');
        }

        return caseListRecord;
    }
}
