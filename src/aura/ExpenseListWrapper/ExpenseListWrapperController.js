({
    doInit : function(component, event, helper) {
        component.set("v.isInit", true);
        helper.doInit(component, event);
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
    },
    expenseOnClick : function(component, event, handler) {
        var modalBody;
        $A.createComponent("c:ExpenseEditor", {expenseId : event.currentTarget.getAttribute("id")},
            function(content, status) {
               if (status === "SUCCESS") {
                   modalBody = content;
                   component.find('overlayLib').showCustomModal({
                        header: "Edit Expense",
                        body: modalBody,
                        showCloseButton: false,
                        cssClass: "mymodal",
                        closeCallback: function() {
                            component.find("overlayLib").notifyClose();
                            $A.get('e.force:refreshView').fire();
                        }
                   })
                }
            });
    },
    clickNext : function(component, event, helper) {
        helper.clickNext(component);
    },
    clickPrevious : function(component, event, helper) {
        component.set("v.isInit", true);
        helper.clickPrevious(component);
    },
    searchChanged : function(component, event, helper) {
        helper.searchExpense(component);
    }
})