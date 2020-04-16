({
    expenseOnClick : function(component, event, helper) {
        var idx = event.currentTarget.getAttribute("id");
    },
	doInit : function(component, event) {
        var action = component.get("c.getMyExpenses");
        var endPositionDefault = 8;
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var expenses = response.getReturnValue();
                var count = expenses.length;
                if (count > 0) {
                    component.set("v.myExpenses", expenses);
                    component.set("v.areRecords", true);
                    component.set("v.recordAmount", expenses.length);
                    if (count > endPositionDefault) {
                        component.set("v.endPosition", endPositionDefault);
                    } else {
                        component.set("v.endPosition", count);
                    }
                    this.cleaveOutputList(component);
                    this.checkNextPrevious(component);
                }
            } else if (state === "ERROR") {
                this.handleError(response.getError());
            }
        });
        $A.enqueueAction(action);
	},
	toggleNewButton : function(component, event) {
        component.set("v.showNew",!component.get("v.showNew"));
    },
    handleError : function(errors) {
        if (errors) {
            if (errors[0] && errors[0].message) {
                console.log("Error message: " + errors[0].message);
            }
        } else {
            console.log("Unknown error");
        }
    },
    cleaveOutputList : function(component) {
        var maxRows         = 8;
        var myExpenses      = component.get("v.myExpenses");
        var startPosition   = component.get("v.startPosition");
        var endPosition     = component.get("v.endPosition");

        if (myExpenses ) {
            if (myExpenses.length > maxRows) {
                component.set("v.myExpensesToShow", myExpenses.slice(startPosition, endPosition));
            } else {
                component.set("v.myExpensesToShow", myExpenses);
            }
        }
    },
    clickPrevious : function(component) {
        if (component.get("v.startPosition") - 8 > 0) {
            component.set("v.startPosition", component.get("v.startPosition") - 8);
            component.set("v.endPosition", component.get("v.endPosition") - 8);
        } else {
            component.set("v.startPosition", 0);
            component.set("v.endPosition", 8);
        }

        this.cleaveOutputList(component);
        this.checkNextPrevious(component);
    },
    clickNext : function(component) {
        if (component.get("v.endPosition") + 8 >= component.get("v.recordAmount")) {
            component.set("v.endPosition", component.get("v.recordAmount"));
        } else {
            component.set("v.endPosition", component.get("v.endPosition") + 8);
        }
        component.set("v.startPosition", component.get("v.startPosition") + 8);
        
        this.cleaveOutputList(component);
        this.checkNextPrevious(component);
    },
    checkNextPrevious : function(component) {
        var start   = component.get("v.startPosition");
        var end     = component.get("v.endPosition");

        if (start <= 0) {
            component.set("v.hasPrevious", false);
        } else {
            component.set("v.hasPrevious", true);
        }
        if (end >= component.get("v.recordAmount")) {
            component.set("v.hasNext", false);
        } else {
            component.set("v.hasNext", true);
        }
    },
    searchExpense : function(component) {
        var inputValue = component.find("expense-search").get("v.value");
        if (inputValue == null || inputValue == "") {
            this.doInit(component);
        } else {
            this.doSearch(component);
        }
    },
    doSearch : function(component) {
        var endPositionDefault = 8;
        var action = component.get("c.getMyExpensesSearch");
        
        action.setParams({
            "inputString" : component.find("expense-search").get("v.value")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var expenses = response.getReturnValue();
                var count = expenses.length;
                if (count > 0) {
                    console.log(expenses.length);
                    component.set("v.isSearching", false);
                    component.set("v.myExpenses", expenses);
                    component.set("v.areRecords", true);
                    component.set("v.recordAmount", expenses.length);
                    if (count > endPositionDefault) {
                        component.set("v.endPosition", endPositionDefault);
                    } else {
                        component.set("v.endPosition", count);
                    }
                    this.cleaveOutputList(component);
                    this.checkNextPrevious(component);
                }
            } else if (state === "ERROR") {
                component.set("v.isSearching", false);
                this.handleError(response.getError());
            } else if (state == "RUNNING") {
                component.set("v.isSearching", true);
            }
        });
        $A.enqueueAction(action);
    }
})