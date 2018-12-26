import React, { Component } from 'react';
import './TickerChart.css';
import DatePicker from "react-date-picker";
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const chartdata = {
    labels: [],
    datasets: [
        {
            label: 'BSE Close',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
        }, {
            label: 'DJI Close',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,255,192,0.4)',
            borderColor: 'rgba(75,255,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,255,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,255,192,1)',
            pointHoverBorderColor: 'rgba(220,0,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
        }
    ]
};

class TickerChart extends Component {

    state = {
        fromDate: new Date(),
        endDate: new Date(),
        reRender: false
    }

    componentDidMount() {
        axios.get('/indicies/BSE')
            .then(resolve => {
                const bseData = resolve.data;
                this.setState({ bseData });
                for(let i = 0; i <= bseData.length; i++){
                    chartdata.labels.push(bseData[i].tickerDate.split("T")[0]);
                    chartdata.datasets[0].data.push(bseData[i].close);
                }
            }).catch((err) => {
                console.error(err)
            });
        axios.get('/indicies/DJI')
            .then(resolve => {
                const djiData = resolve.data;
                this.setState({ djiData });
                for(let i = 0; i <= djiData.length; i++){
                    chartdata.datasets[1].data.push(djiData[i].close);
                }
            }).catch((err) => {
                console.error(err)
            });
    }

    handleFromDateChange = date => {
        this.setState({ reRender: true });
        this.setState({ fromDate: date })
    };
    handleEndDateChange = date => {
        if (this.state.endDate > this.state.fromDate) {
            this.setState({ endDate: date });
            this.setState({ reRender: true });
        } else {
            this.setState({ reRender: false });
        }
    };


    render() {
        console.log(this.state.fromDate.toLocaleDateString("en-US") + " " + this.state.fromDate.toLocaleDateString("en-US") + this.state.reRender);
        if (this.state.reRender) {
            var queryString = "?from=" + this.state.fromDate.toISOString().split('T')[0] + "&to=" +
                this.state.endDate.toISOString().split('T')[0];
            axios.get('/indicies/BSE' + queryString)
                .then((resolve) => {
                    const bseData = resolve.data;
                this.setState({ bseData });
                for(let i = 0; i <= bseData.length; i++){
                    chartdata.labels.push(bseData[i].tickerDate.split("T")[0]);
                    chartdata.datasets[0].data.push(bseData[i].close);
                }
                }).catch((err) => {
                    console.error(err)
                });
            axios.get('/indicies/DJI' + queryString)
                .then((resolve) => {
                    const djiData = resolve.data;
                this.setState({ djiData });
                for(let i = 0; i <= djiData.length; i++){
                    chartdata.datasets[1].data.push(djiData[i].close);
                }
                }).catch((err) => {
                    console.error(err)
                });
        }
        return (
            <div className="ticker-chart-display">
                <div className="ticker-header-bar">
                    Select Ticker Dates between &nbsp;
                    <DatePicker value={this.state.fromDate} onChange={this.handleFromDateChange} maxDate={new Date()} minDate={new Date('2013-12-15')} />
                    and &nbsp;
                    <DatePicker value={this.state.endDate} onChange={this.handleEndDateChange} maxDate={new Date()} minDate={new Date('2013-12-15')} />
                </div>
                <div>
                    <Line data={chartdata} />
                </div>
            </div>
        );
    }
}

export default TickerChart;
