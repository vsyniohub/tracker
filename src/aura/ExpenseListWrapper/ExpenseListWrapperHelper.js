({
    expenseOnClick : function(component, event, helper) {
        var idx = event.currentTarget.getAttribute("id");
    },
	doInit : function(component, event) {
		var action = component.get("c.getMyExpenses");
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var expenses = response.getReturnValue();
                if (expenses.length > 0) {
                    component.set("v.myExpenses", expenses);
                    component.set("v.areRecords", true);
                }
                
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
	},
	toggleNewButton : function(component, event) {
        component.set("v.showNew",!component.get("v.showNew"));
	}
})