import {
  Component,
  OnInit,
} from '@angular/core';

import {
  ChartConfiguration,
  ChartType,
} from 'chart.js';

import {
  WeatherService,
} from '../../services/weather.service'; // Adjust the path

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.scss']
})
export class WeatherDisplayComponent implements OnInit {
  weatherData: any;
  date: Date;
  forcastData: any;

  // Chart options
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false, // Allows chart to resize based on container dimensions
    scales: {
      x: {
        grid: {
          display: false // Remove gridlines for the x-axis
        },
        title: {
          display: false,
        },
        ticks: {
          autoSkip: false,
          callback: (value, index, values) => {
            const item = this.forcastData.hourly[index];
            const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const windSpeed = item.wind_speed.toFixed(1) + ' km/h';
            const precipitation = '💧: ' + (item.pop * 100).toFixed(0) + '%';

            return [time, windSpeed, precipitation]; // Multi-line
          },
          font: {
            size: 12, // Customize font size
            family: 'Arial', // Customize font family
            weight: 'bold', // Customize font weight
          },
          padding: 10, // Add padding between the tick labels and axis
          color: '#000', // Customize label color
        },
       
        
      },
      y: {
        display: false, // Hide the y-axis completely
        grid: {
          display: false // Remove gridlines for the y-axis
        }
      }
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: true, // Disable tooltips
      },
      datalabels: {
        anchor: 'end', // Display labels above the line
        align: 'top',
        formatter: function(value: any) {
          return value.toFixed(1); // Display temperature value rounded to no decimals
        },
        color: '#444', // Label color
        font: {
          weight: 'bold',
          size: 10
        }
      }
    }
  };
  

  // Chart type
  public lineChartType: ChartType = 'line';

  // Initialize chart labels and data
  public lineChartLabels: string[] = [];
  public lineChartData: ChartConfiguration['data'] = {
    labels: this.lineChartLabels,
    datasets: [
      {
        label: '',
        data: [], // Initialize empty data
        fill: false, // Disable background fill color
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        pointRadius: 0, // Remove points (dots)
        borderWidth: 5, // Adjust the line thickness
                
      }
    ]
  };

  constructor(private weatherService: WeatherService) {
    this.date = new Date();
  }

  ngOnInit(): void {
    // Subscribe to the defaultData$ Observable
    this.weatherService.getDefaultData().subscribe(
      (data) => {
        if (data) {
          this.weatherData = data;
        }
      },
      (error) => {
        console.error('Error retrieving weather data:', error);
      }
    );

    // Fetch forecast data
    this.weatherService.getForcastData().subscribe(
      (data1) => {
        if (data1) {
          console.log(data1); // Debugging: Check the structure of the response
          this.forcastData = data1;

          // Check if hourly data exists
          if (this.forcastData.hourly && this.forcastData.hourly.length > 0) {
            // Populate chart labels and data from forecast data
            this.lineChartLabels = this.forcastData.hourly.slice(0, 48).map((item: { dt: number; }) => new Date(item.dt * 1000).toLocaleTimeString());

            // Map temperatures (assuming the temp property contains temperature in Kelvin)
            this.lineChartData.datasets[0].data = this.forcastData.hourly.slice(0, 48).map((item: { temp: number; }) =>(item.temp - 273.15));

            // Update chart data to trigger change detection
            this.lineChartData.labels = this.lineChartLabels;
            this.lineChartData = { ...this.lineChartData }; 
            console.log(this.lineChartData);
          } else {
            console.warn('No hourly data available for the forecast.');
          }
        }
      },
      (error) => {
        console.error('Error retrieving forecast data:', error);
      }
    );
  }
}
