import {
  Component,
  OnInit,
} from '@angular/core';

import * as Highcharts from 'highcharts';

import {
  WeatherService,
} from '../../services/weather.service'; // Adjust the path

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.scss']
})
export class WeatherDisplayComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  weatherData: any;
  date: Date;
  forcastData: any;
  chartOptions?: Highcharts.Options; // Mark chartOptions as optional (undefined initially)

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
            // Populate chart data
            this.initializeChart();
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

  initializeChart(): void {
    const labels = this.forcastData.hourly.slice(0, 48).map((item: { dt: number; }) =>
      new Date(item.dt * 1000).getTime() // Convert to milliseconds for Highcharts
    );
  
    const temperatureDataPoints = this.forcastData.hourly.slice(0, 48).map((item: { temp: number; }) =>
      (item.temp - 273.15) // Convert Kelvin to Celsius
    );
  
    const windSpeedDataPoints = this.forcastData.hourly.slice(0, 48).map((item: { wind_speed: number; }) =>
      item.wind_speed !== undefined ? item.wind_speed : 0 // Ensure wind speed is defined, fallback to 0
    );
  
    const weatherIcons = this.forcastData.hourly.slice(0, 48).map((item: { weather: any[]; }) =>
      item.weather[0].icon // Extract weather icon code
    );
  
    this.chartOptions = {
      chart: {
        type: 'line',
        height: '300px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        scrollablePlotArea: {
          minWidth: 7000, // Make the chart much wider to allow scrolling
          scrollPositionX: 1,
        },
      },
      title: {
        text: '',
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: '',
        },
        labels: {
          useHTML: true, // Enable HTML for custom labels
          formatter: function (): string {
            const oneHourMs = 3600000; // 1 hour in milliseconds
            
            // Ensure the xAxis exists and has a valid min value
            const xAxisMin = this.chart.xAxis[0]?.min;
            if (typeof xAxisMin !== 'number') {
              return ''; // Return empty if xAxis min is not a valid number
            }
          
            // Convert this.value to a number and calculate the index based on the x-axis position
            const valueAsNumber = Number(this.value);
            const pointIndex = Math.floor((valueAsNumber - xAxisMin) / oneHourMs); // Calculate the index
          
            // Ensure the index is within bounds
            if (pointIndex < 0 || pointIndex >= windSpeedDataPoints.length) {
              return ''; // Return empty if index is out of range
            }
          
            // Safely retrieve wind speed and format it
            const windSpeed = windSpeedDataPoints[pointIndex] !== undefined ? windSpeedDataPoints[pointIndex].toFixed(1) : 'N/A';
          
            // Safely retrieve the weather icon
            const icon = weatherIcons[pointIndex];
            const iconUrl = icon ? `https://openweathermap.org/img/wn/${icon}.png` : '';
          
            const time = Highcharts.dateFormat('%H:%M', valueAsNumber); // Format the time
          
            return `
              <div style="text-align: center;">
                <img src="${iconUrl}" style="width: 50px;" alt="Weather icon"/><br/>
                <span style="font-size: 12px; color: #333;">${windSpeed} km/h</span><br/>
                <span>${time}</span><br/>
               
              </div>`;
          }
          ,
          style: {
            fontSize: '12px',
            color: '#666',
          }
        },
        tickInterval: 3600 * 1000, // 1-hour intervals
        gridLineWidth: 0,
        lineColor: 'transparent',
      },
      yAxis: [{
        visible: false, // Hide temperature axis
      }],
      series: [{
        type: 'line',
        name: '',
        data: temperatureDataPoints.map((value: number, index: number) => [labels[index], value]),
        marker: {
          enabled: true,
          radius: 0, // Increase marker radius for better visibility
        },
        dataLabels: {
          enabled: true,
          formatter: function () {
            const temperature = this.y !== null && this.y !== undefined ? this.y.toFixed(0) : 'N/A'; // Check if y is defined
            return `${temperature}°C`; // Display only temperature in °C
          },
          align: 'center',
          verticalAlign: 'bottom',
          style: {
            fontSize: '14px',
            color: '#000',
          }
        },
        color: '#64E572', // Green color for the line
        lineWidth: 2,
      }],
      tooltip: {
        enabled: false, // Disable tooltips
      },
      credits: {
        enabled: false, // Disable credits
      },
    };
  }
  
  
  
  
  
  
}
