import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardController } from '../../controllers/dashboard.controller';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, PieController, ArcElement, Tooltip, Legend, BarController, BarElement, CategoryScale, LinearScale } from 'chart.js';
Chart.register(PieController, ArcElement, Tooltip, Legend, BarController, BarElement, CategoryScale, LinearScale);





@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',   
  styleUrls: ['./dashboard.component.scss'],  
  providers: [DashboardController],            
  
})
export class DashboardComponent implements OnInit {
  constructor(public controller: DashboardController) {}

  ngOnInit(): void {
    this.controller.cargarDatos();
    this.controller.cargarCafePorMes();
    this.controller.cargarCafePorTipo();
  }
}
