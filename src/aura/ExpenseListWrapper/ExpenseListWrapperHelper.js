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
                if (expenses.length > 0) {
                    component.set("v.myExpenses", expenses);
                    component.set("v.areRecords", true);
                    component.set("v.recordAmount", expenses.length);
                    component.set("v.endPosition", endPositionDefault);
                    this.cleaveOutputList(component);
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
    }
})