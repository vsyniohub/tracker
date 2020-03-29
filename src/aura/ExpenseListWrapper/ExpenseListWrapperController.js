({
    doInit : function(component, event, helper) {
        helper.doInit(component, event);
    },
    expenseOnClick : function(component, event, helper) {
        var idx = event.currentTarget.getAttribute("id");
    },
    handleCreate : function(component, event, helper) {
        var createRecordEvent = $A.get("e.force:createRecord");
        createRecordEvent.setParams({
            "entityApiName": "Expense__c"
        });
        createRecordEvent.fire();
    },
    handleSearchClicked : function(component, event, helper) {
        var isSearchEnabled = component.get("v.isSearchEnabled"); 
        var searchButton = component.find('expense-search-button');
        if (searchButton) {
            if (isSearchEnabled == true) {
                searchButton.set("v.variant", "border-filled");
            } else {
                searchButton.set("v.variant", "brand");
            }
        }
        component.set("v.isSearchEnabled", !isSearchEnabled);
    }
})