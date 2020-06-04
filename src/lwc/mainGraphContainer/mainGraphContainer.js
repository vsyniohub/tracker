import { LightningElement, track, wire } from 'lwc';
import getAggregatedExpenses from '@salesforce/apex/ExpenseListController.getAggregatedExpenses';
import { loadScript } from 'lightning/platformResourceLoader';
import chartJSLibrary from '@salesforce/resourceUrl/ChartJS23';

export default class MainGraphContainer extends LightningElement {
    @track filterName = 'YEAR';
    @track chartLabel = '';
    @track isData = true;
    @track noDataCaption = '';
    @track chartData;
    @track dailyChartSelectedState = false;
    @track weeklyChartSelectedState = false;
    @track monthlyChartSelectedState = false;

    localStorageFilterName = 'filterName';
    
    renderedCallback() {
        Promise.all([
            loadScript(this, chartJSLibrary),
        ]).then((values) => {
            this.retrieveDataAggregated();
        }).catch(error => {
            console.log(error.body.message);
        });
    }

    dailyChartSelected(event) {
        this.filterName = 'DAY';
        this.chartData = 'Expenses Today';
        this.noDataCaption = 'Today';

        this.resetAllButtons();
        console.log(localStorage.getItem(localStorageFilterName));
        this.dailyChartSelectedState = true;
        this.retrieveDataAggregated();
    }
    weeklyChartSelected(event) {
        this.filterName = 'WEEK';
        this.chartData = 'Expenses This Week';
        this.noDataCaption = 'This Week';
        
        this.resetAllButtons();
        this.weeklyChartSelectedState = true;
        this.retrieveDataAggregated();
        localStorage.setItem(localStorageFilterName, this.filterName);
    }
    monthlyChartSelected(event) {
        this.filterName = 'MONTH';
        this.chartData = 'Expenses This Month';
        this.noDataCaption = 'This Month';

        this.resetAllButtons();
        this.monthlyChartSelected = true;
        this.retrieveDataAggregated();
        localStorage.setItem(localStorageFilterName, this.filterName);
    }
    retrieveDataAggregated() {
        getAggregatedExpenses({period: this.filterName})
        .then(dataRetrieved => {
            console.log(dataRetrieved);
            if (typeof dataRetrieved !== 'undefined' && dataRetrieved.length > 0) {
                var labelSet = [];
                var dataSet = [];
                
                dataRetrieved.forEach(function(key) { 
                    labelSet.push(key.label); 
                    dataSet.push(key.sumAmount); 
                });
                this.isData = true;
                this.generateChart(dataSet, labelSet);
            } else {
                this.isData = false;
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
    generateChart(dataSet, labelSet) {
        let chartObject = this.template.querySelectorAll('canvas');
            new Chart(chartObject, {
                type: 'pie',
                data: {
                    labels:labelSet,
                    datasets: [{
                        label: "Spent",
                        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f", "#1155c2"],
                        data: dataSet
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: this.chartLabel
                    }
                }
            });
    }
    resetAllButtons() {
        this.dailyChartSelectedState = false;
        this.weeklyChartSelectedState = false;
        this.monthlyChartSelectedState = false;
    }
}