/* *********************************
** ClassName:   TrackerUtility
** Description: Used for type classes and generic methods
**
**
** ********************************* */
public without sharing class TrackerUtility {

    public class ChartExpenseData {
        @AuraEnabled
        public String label {get; set;}
        @AuraEnabled
        public Decimal sumAmount {get; set;}

        public ChartExpenseData(String label, Decimal sumAmount) {
            this.label      = label; 
            this.sumAmount  = sumAmount;
        }
    }
}
