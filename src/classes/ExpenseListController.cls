public class ExpenseListController {
    public static final String SPACE = ' ';
    public static final String MAIN_QUERY = 'SELECT Id, Subject__c, Amount__c, Account__r.Name, Description__c, Expense_Date__c, Type__c FROM Expense__c';
    public static final String ORDER_BY = 'ORDER BY Expense_Date__c DESC';
    public static final String STRING_WHERE_CLAUSE = 'WHERE Subject__c like :likeClause OR Description__c like :likeClause';
    public static final String DECIMAL_WHERE_CLAUSE = 'WHERE Amount__c = :searchAmountDecimal OR Subject__c like :likeClause OR Description__c like :likeClause';

    @AuraEnabled
    public static List<Expense__c > getMyExpenses() {
        return Database.query(MAIN_QUERY + SPACE + ORDER_BY);
    }

    @AuraEnabled
    public static List<Expense__c > getMyExpensesSearch(String inputString) {
        String finalQuery;
        String likeClause = '%' + inputString + '%';
        Decimal searchAmountDecimal;

        try {
            searchAmountDecimal = Decimal.valueOf(inputString);
            finalQuery =    MAIN_QUERY + SPACE + 
                            DECIMAL_WHERE_CLAUSE + SPACE + 
                            ORDER_BY;
        } catch (Exception e) {
            finalQuery =    MAIN_QUERY + SPACE + 
                            STRING_WHERE_CLAUSE + SPACE + 
                            ORDER_BY;
        }

        return Database.query(finalQuery);
    }
}