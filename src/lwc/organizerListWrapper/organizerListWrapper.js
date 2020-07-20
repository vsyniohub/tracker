import { LightningElement, track } from 'lwc';

export default class OrganizerListWrapper extends LightningElement {
    noLabelValue = " ";
    items = [
        {
            id : 1,
            label : "Some"
        },
        {
            id : 2,
            label : "Some"
        }
    ];
}