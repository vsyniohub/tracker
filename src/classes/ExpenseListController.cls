/* *********************************
** ClassName:   ExpenseListController
** Description: Controller for Expense List and Charts
**
**
** ********************************* */
public class ExpenseListController {
    public static final String SPACE = ' ';
    public static final String MAIN_QUERY = 'SELECT Id, Subject__c, Amount__c, Account__r.Name, Description__c, Expense_Date__c, Type__c FROM Expense__c';
    public static final String ORDER_BY = 'ORDER BY Expense_Date__c DESC';
    public static final String STRING_WHERE_CLAUSE = 'WHERE Subject__c like :likeClause OR Description__c like :likeClause';
    public static final String DECIMAL_WHERE_CLAUSE = 'WHERE Amount__c = :searchAmountDecimal OR Subject__c like :likeClause OR Description__c like :likeClause';
    private static final String NO_CATEGORY = 'No Category';
    private static final Map<String, String> FILTER_LITERALS = new Map<String,String>{
        'DAY'   => 'TODAY',
        'WEEK'  => 'THIS_WEEK',
        'MONTH' => 'THIS_MONTH',
        'YEAR'  => 'THIS_YEAR'
    };

    /* *********************************
    ** Method:   getMyExpenses
    ** Description: 
    ** ********************************* */
    @AuraEnabled
    public static List<Expense__c > getMyExpenses() {
        return Database.query(MAIN_QUERY + SPACE + ORDER_BY);
    }

    /* *********************************
    ** Method:   getMyExpensesSearch
    ** Description: 
    ** ********************************* */
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

    /* *********************************
    ** Method:   getAggregatedExpenses
    ** Description: 
    ** ********************************* */
    @AuraEnabled
    public static List<TrackerUtility.ChartExpenseData> getAggregatedExpenses(String period) {
        System.debug('Reached APEX ' + period);
        List<TrackerUtility.ChartExpenseData> dataSet = new List<TrackerUtility.ChartExpenseData>();
        List<AggregateResult> dailyExpenses = Database.query(
            'SELECT SUM(Amount__c) sm, Type__c tp ' + 
            'FROM Expense__c ' +
            'WHERE Expense_Date__c = ' + FILTER_LITERALS.get(period) + 
            ' GROUP BY Type__c');

        for(AggregateResult result: dailyExpenses) {
            String expenseType  = result.get('tp') != null ? (String)result.get('tp') : NO_CATEGORY;
            Decimal expenseSum  = (Decimal)result.get('sm'); 
            dataSet.add(new TrackerUtility.ChartExpenseData(expenseType, expenseSum));
        }

        return dataSet;
    }
}