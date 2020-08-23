/* *********************************
** ClassName:   NotesListController
** Description: Controller for Notes List
**
**
** ********************************* */
public with sharing class NotesListController {
    
    /* *********************************
    ** Method:   getMyNotes
    ** Description: 
    ** ********************************* */
    @AuraEnabled
    public static List<Expense__c > getMyNotes() {
        return Database.query('SELECT Id, Title__c, Type__c FROM Note__c');
    }
}
