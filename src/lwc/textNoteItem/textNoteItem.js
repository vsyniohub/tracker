import { LightningElement } from 'lwc';
import getNotes from '@salesforce/apex/NotesListController.getMyNotes';

export default class TextNoteItem extends LightningElement {
    /**
     * Variables
     */
    formats = [
        'bold', 'italic', 'underline', 'list', 'indent',
        'image', 'clean', 'table', 'header', 'color'
    ];

    retrieveData() {
        getNotes({
        }).then(dataRetrieved => {
            if (typeof dataRetrieved !== 'undefined' && dataRetrieved.length > 0) {
                
            } else {
            }
        }).catch(error => {
            console.log(error);
        });
    }
}