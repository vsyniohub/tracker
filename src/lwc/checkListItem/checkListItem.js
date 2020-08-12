import { LightningElement, track } from 'lwc';

export default class CheckListItem extends LightningElement {
    /**
     * Variables
     */
    noLabelValue    = " ";
    richText        = "";
    formats         = [
        'bold', 'italic', 'underline', 'list', 'indent',
        'image', 'clean', 'table', 'header', 'color'
    ];

    /**
     * Track variables
     */
    @track items = [
        {
            id : this.returnRandomId(),
            label : "Some"
        },
        {
            id : this.returnRandomId(),
            label : "Some"
        }
    ];

    handleItemChange(event) {
        console.log(event.target.dataset.id);
    }
    itemCreateNext(component, event) {
        let selectedId = component.target.dataset.id;
        if (component.which == 13){
            console.log(component.target.dataset.id);
            console.log(JSON.stringify(this.items));
            this.injectItem(
                this.returnIdFromList(selectedId)
            );
            console.log(JSON.stringify(this.items));
            console.log(this.returnIdFromList(selectedId));
        }
        
    }
    injectItem(indexAt) {
        this.items.splice(
            indexAt, 0, 
            {
                id : this.returnRandomId(),
                label : "Some"
            }
        );
    }
    returnRandomId() {
        return Math.floor(Math.random() * 100);
    }
    returnIdFromList(element) {
        return this.items.findIndex(data => data.id == element);
    }
}