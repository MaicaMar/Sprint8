// https://github.com/valor-software/ng2-charts/blob/master/apps/ng2-charts-demo/src/app/bar-chart/bar-chart.component.html
// https://www.chartjs.org/docs/latest/

import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { GraphicsService } from '../../services/graphics.service';


@Component({
  selector: 'app-graphics',
  standalone: true,
  imports: [ NgChartsModule, CanvasJSAngularChartsModule ],
  templateUrl: './graphics.component.html',
  styleUrl: './graphics.component.css'
})
export class GraphicsComponent {
@ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;


// PROPIEDADES BAR CHART
  public barChartOptions: ChartConfiguration['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = {
    labels: [], // Inicialmente vacío, se llenará con datos del servicio
    datasets: [
      { data: [], label: 'Series A', backgroundColor: '#198754' },
      { data: [], label: 'Series B', backgroundColor: '#8fdf82' },
    ],
  };


// CONSTRUCTOR Y ONINIT
  constructor(private graphicsService: GraphicsService) {}

  ngOnInit(): void {
    // Llama al servicio para obtener los datos al iniciar el componente
    this.loadBarChartData();
    this.loadPieChartData();
  }


  // FUNCIONES BAR CHART

  loadBarChartData(): void {
    this.graphicsService.getBarChartData().subscribe((data) => {
      // Asigna los datos a barChartData.labels y barChartData.datasets
      this.barChartData.labels = data.map((entry: any) => entry.year);
      this.barChartData.datasets[0].data = data.map((entry: any) => entry.series_a);
      this.barChartData.datasets[1].data = data.map((entry: any) => entry.series_b);
      // Actualiza el gráfico
      this.chart?.update();
    });
  }

  // Función para actualizar datos (llama al servicio)
  updateBarChart(): void {
    const idToUpdate = 1;
    const newData = { year: '2022', series_a: 50, series_b: 60 }; // Reemplaza con tus datos
    this.graphicsService.updateBarChartData(idToUpdate, newData).subscribe(() => {
      // Luego de la actualización, actualiza los datos del gráfico
      this.graphicsService.getBarChartData().subscribe((data) => {
        this.barChartData.labels = data.map((entry: any) => entry.year);
        this.barChartData.datasets[0].data = data.map((entry: any) => entry.series_a);
        this.barChartData.datasets[1].data = data.map((entry: any) => entry.series_b);

        // Actualiza el gráfico
        this.chart?.update();
      });
    });
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40,
    ];

    this.chart?.update();
  }



// PROPIEDADES PIE CHART
months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
currentMonthIndex: number = 1;
dataPoints : { y: number; name: string }[] = [];
chart2: any;

getChartInstance(chart: object) {
  this.chart2 = chart;
}

pieChartOptions = {
  animationEnabled: true,
  title: {
  text: "Sales by Department 2023",
  fontFamily: "Rubik",
  fontSize: 25,
  fontColor: "#354259",
  margin: 25,
  },
  data: [{
    type: "pie",
    startAngle: -90,
    indexLabel: "{name}: {y}",
    yValueFormatString: "#,###.##'%'",
    dataPoints: this.dataPoints  // Inicializado como un array tipado
  }]
}

  // FUNCIONES PIE CHART
  loadPieChartData() {
    console.log('Cargando datos del backend...');

    this.graphicsService.getPieChartDataById(this.currentMonthIndex).subscribe({
      next: (data: any) => {
        console.log(this.currentMonthIndex, data);
        this.pieChartOptions.data[0].dataPoints = [
          { y: data.toys, name: "Toys" },
          { y: data.electronics, name: "Electronics" },
          { y: data.groceries, name: "Groceries" },
          { y: data.furniture, name: "Furniture" }
        ];
       this.chart2.render();
      },
      error: (error: any) => console.error('Error cargando datos del backend:', error),
      complete: () => console.log('FIN')
    });

  }

  monthForward() {
    this.currentMonthIndex = this.currentMonthIndex + 1;
    console.log('Mes avanzado. Nuevo índice:', this.currentMonthIndex);
    this.loadPieChartData();
  }

  monthBackward() {
    this.currentMonthIndex = this.currentMonthIndex - 1;
    console.log('Mes retrocedido. Nuevo índice:', this.currentMonthIndex);
    this.loadPieChartData();
  }


}
