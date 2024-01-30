// https://github.com/valor-software/ng2-charts/blob/master/apps/ng2-charts-demo/src/app/bar-chart/bar-chart.component.html
// https://www.chartjs.org/docs/latest/

import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
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


// GRÁFICO DE BARRAS
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

  constructor(private graphicsService: GraphicsService) {}

  ngOnInit(): void {
    // Llama al servicio para obtener los datos al iniciar el componente
    this.loadData();
  }

  loadData(): void {
    this.graphicsService.getGraphicsData().subscribe((data) => {
      // Asigna los datos a barChartData.labels y barChartData.datasets
      this.barChartData.labels = data.map((entry: any) => entry.year);
      this.barChartData.datasets[0].data = data.map((entry: any) => entry.series_a);
      this.barChartData.datasets[1].data = data.map((entry: any) => entry.series_b);

      // Actualiza el gráfico
      this.chart?.update();
    });
  }

  // Función para actualizar datos (llama al servicio)
  updateData(): void {
    // Asegúrate de tener el ID correcto y los datos a actualizar
    const idToUpdate = 1; // Reemplaza con el ID adecuado
    const newData = { year: '2022', series_a: 50, series_b: 60 }; // Reemplaza con tus datos
    this.graphicsService.updateGraphicsData(idToUpdate, newData).subscribe(() => {
      // Luego de la actualización, actualiza los datos del gráfico
      this.graphicsService.getGraphicsData().subscribe((data) => {
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


  // GRÁFICO "DOUGHNUT"
  doughnutChartOptions = {
	  animationEnabled: true,
	  /*title: {
		text: "Ventas por departamento"
	  },*/
	  data: [{
		type: "pie",
		startAngle: -90,
		indexLabel: "{name}: {y}",
		yValueFormatString: "#,###.##'%'",
		dataPoints: [
		  { y: 14.1, name: "Toys" },
		  { y: 28.2, name: "Electronics" },
		  { y: 14.4, name: "Groceries" },
		  { y: 43.3, name: "Furniture" }
		]
	  }]
	}
}
