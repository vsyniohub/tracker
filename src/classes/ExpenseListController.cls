public class ExpenseListController {
    @AuraEnabled
    public static List<Expense__c > getMyExpenses() {
        return [SELECT Id, Subject__c, Amount__c, Account__r.Name, Description__c, Expense_Date__c, Type__c FROM Expense__c ORDER BY Expense_Date__c DESC];
    }
}