import React, { Component } from 'react';
import './TickerChart.css';
import 'react-notifications/lib/notifications.css';
import DatePicker from "react-date-picker";
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { NotificationContainer, NotificationManager } from 'react-notifications';


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
        bseData: [],
        djiData: [],
        render: true
    }

    async getData(index, fromDt, toDt) {
        var queryString = "?from=" + fromDt.toISOString().split('T')[0] + "&to=" +
            toDt.toISOString().split('T')[0];
        try {
            var response = await axios.get('/indicies/' + index + queryString);
            return response.data;
        } catch (err) {
            NotificationManager.error('Failed to fetch Data');
            console.error(err);
        }
    }

    componentDidMount() {
        var sixMonths = new Date();
        sixMonths.setMonth(sixMonths.getMonth() - 6);
        this.setState({ fromDate: sixMonths });
        this.getData('BSE', sixMonths, this.state.endDate)
            .then((data) => {
                this.setState({ bseData: data })
            }).catch((err) => {
                console.error(err);
            });
        this.getData('DJI', sixMonths, this.state.endDate)
            .then((data) => {
                this.setState({ djiData: data })
            }).catch((err) => {
                console.error(err);
            });
    }

    handleFromDateChange = date => {
        if (date !== this.state.fromDate && date < this.state.endDate) {
            this.setState({ render: true });
            this.setState({ fromDate: date })
            this.getData('BSE', date, this.state.endDate)
                .then((data) => {
                    this.setState({ bseData: data })
                }).catch((err) => {
                    console.error(err);
                });
            this.getData('DJI', date, this.state.endDate)
                .then((data) => {
                    this.setState({ djiData: data })
                }).catch((err) => {
                    console.error(err);
                });
        } else {
            this.setState({ render: false });
            NotificationManager.error('Invalid Range');
        }
    };
    handleEndDateChange = date => {
        if (date !== this.state.endDate && date > this.state.fromDate) {
            this.setState({ endDate: date });
            this.setState({ render: true });
            this.getData('BSE', this.state.fromDate, date)
                .then((data) => {
                    this.setState({ bseData: data })
                }).catch((err) => {
                    console.error(err);
                });
            this.getData('DJI', this.state.fromDate, date)
                .then((data) => {
                    this.setState({ djiData: data })
                }).catch((err) => {
                    console.error(err);
                });
        } else {
            this.setState({ render: false });
            NotificationManager.error('Invalid Range');
        }
    };


    render() {
        if (this.state.bseData === undefined || this.state.djiData === undefined) {
            return null;
        } else if (this.state.bseData.length === 0 || this.state.djiData.length === 0) {
            return null;
        } else if (this.state.render) {
            chartdata.labels = [];
            chartdata.datasets[0].data = [];
            chartdata.datasets[1].data = [];
            for (let i = 0; i < this.state.bseData.length; i++) {
                chartdata.labels.push(this.state.bseData[i].tickerDate.split("T")[0]);
                chartdata.datasets[0].data.push(this.state.bseData[i].close);
            }
            for (let i = 0; i < this.state.djiData.length; i++) {
                chartdata.datasets[1].data.push(this.state.djiData[i].close);
            }
        }

        return (
            <div className="ticker-chart-display">
                <NotificationContainer />
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
