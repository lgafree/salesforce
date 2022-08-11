({
    fetchCasesHelper : function(component, event, handler) {
        var action = component.get('c.getCases')
        action.setParams({searchKey: component.find('enter-search').get('v.value')})
        action.setCallback(this, function(response){
            var state = response.getState()
            if(state==="SUCCESS"){
                component.set('v.caseList', response.getReturnValue())
                console.log(component.get('v.caseList'))
            }
        })
        $A.enqueueAction(action)
    }
})
