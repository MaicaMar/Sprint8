import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { GraphicsService } from '../../services/graphics.service';
import { PieChartData } from '../../interfaces/pie-chart-data.interface';

@Component({
  selector: 'app-graphics',
  standalone: true,
  imports: [NgChartsModule, CanvasJSAngularChartsModule],
  templateUrl: './graphics.component.html',
  styleUrl: './graphics.component.css',
})
export class GraphicsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // ... otras propiedades ...

  // GRÁFICO DE BARRAS
  public barChartOptions: ChartConfiguration['options'] = {
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
    labels: [],
    datasets: [
      { data: [], label: 'Series A', backgroundColor: '#198754' },
      { data: [], label: 'Series B', backgroundColor: '#8fdf82' },
    ],
  };

  // GRÁFICO "PIE" (corregido de "DOUGHNUT")
  pieChartOptions: ChartConfiguration['options'] = {
    //animationEnabled: true,
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
    data: [
      {
        type: 'pie',
        startAngle: -90,
        indexLabel: '{name}: {y}',
        yValueFormatString: "#,###.##'%'",
        dataPoints: [],
      },
    ],
  };

  pieChartData!: PieChartData[];
  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  mesActualIndex: number = 0;

  constructor(private graphicsService: GraphicsService) {}

  ngOnInit(): void {
    // Llama al servicio para obtener los datos al iniciar el componente
    this.loadData();
    this.loadPieChartData(); // Renombrado de 'loadDoughnutChartData' a 'loadPieChartData'
  }

  loadData(): void {
    this.graphicsService.getBarChartData().subscribe((data) => {
      this.barChartData.labels = data.map((entry: any) => entry.year);
      this.barChartData.datasets[0].data = data.map((entry: any) => entry.series_a);
      this.barChartData.datasets[1].data = data.map((entry: any) => entry.series_b);

      this.chart?.update();
    });
  }

  // Renombrado de 'loadDoughnutChartData' a 'loadPieChartData'
  loadPieChartData(): void {
    this.graphicsService.getPieChartData().subscribe(
      (data) => {
        this.pieChartData = data;
        this.updatePieChartOptions(); // Renombrado de 'updateDoughnutChartOptions' a 'updatePieChartOptions'
      },
      (error) => {
        console.error('Error fetching pie chart data', error);
      }
    );
  }

  // Renombrado de 'updateDoughnutChartOptions' a 'updatePieChartOptions'
  updatePieChartOptions(): void {
    this.pieChartOptions.data[0].dataPoints = [
      { y: this.pieChartData[this.mesActualIndex].segment_toys, name: 'Toys' },
      { y: this.pieChartData[this.mesActualIndex].segment_electronics, name: 'Electronics' },
      { y: this.pieChartData[this.mesActualIndex].segment_groceries, name: 'Groceries' },
      { y: this.pieChartData[this.mesActualIndex].segment_furniture, name: 'Furniture' },
    ];
  }

  // Eventos y funciones asociadas al gráfico de barras
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
    // Solo cambia 3 valores de manera aleatoria
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
}
