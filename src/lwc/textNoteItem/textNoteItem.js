import { LightningElement } from 'lwc';

export default class TextNoteItem extends LightningElement {
    /**
     * Variables
     */
    formats = [
        'bold', 'italic', 'underline', 'list', 'indent',
        'image', 'clean', 'table', 'header', 'color'
    ];
}