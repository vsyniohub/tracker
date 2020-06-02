import { LightningElement, track, wire } from 'lwc';
import getAggregatedExpenses from '@salesforce/apex/ExpenseListController.getAggregatedExpenses';
import { loadScript } from 'lightning/platformResourceLoader';
import chartJSLibrary from '@salesforce/resourceUrl/ChartJS23';

export default class MainGraphContainer extends LightningElement {
    @track filterName = 'YEAR';
    @track chartData;
    @track dailyChartSelectedState = false;
    @track weeklyChartSelectedState = true;
    @track monthlyChartSelectedState = false;
    
    //@wire(getAggregatedExpenses, { period: '$filterName' }) chartData;
    /*
    @wire(getAggregatedExpenses, { period: '$filterName' }) putChartData(dataRetrieved, error) {
        if (typeof dataRetrieved !== 'undefined') {
            this.chartData = JSON.stringify(dataRetrieved);
            var labelset = [];
            var dataset = [];

            console.log(dataRetrieved);
            console.log(document.getElementById("pie-chart"));
            
            dataRetrieved.data.forEach(function(key) {
                labelset.push(key.label); 
                dataset.push(key.count); 
            });

            new Chart(document.getElementById("pie-chart"), {
                type: 'pie',
                data: {
                    labels:labelset,
                    datasets: [{
                        label: "Count of Task",
                        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"],
                        data: dataSet
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Expenses This Week'
                    }
                }
            });
        } else {
            this.chartData = JSON.stringify(error);
        }
    };*/

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

    }
    weeklyChartSelected(event) {

    }
    monthlyChartSelected(event) {
        
    }
    retrieveDataAggregated() {
        getAggregatedExpenses({period: this.filterName})
        .then(dataRetrieved => {
            console.log(dataRetrieved);

            var labelSet = [];
            var dataSet = [];
            
            dataRetrieved.forEach(function(key) { 
                labelSet.push(key.label); 
                dataSet.push(key.sumAmount); 
            });

            let chartObject = this.template.querySelectorAll('canvas');
            new Chart(chartObject, {
                type: 'pie',
                data: {
                    labels:labelSet,
                    datasets: [{
                        label: "Spent",
                        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
                        data: dataSet
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Expenses This Week'
                    }
                }
            });
        })
        .catch(error => {
            console.log(error);
        });
    }
}