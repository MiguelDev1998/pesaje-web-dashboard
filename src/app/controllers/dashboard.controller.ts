import { Injectable } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Injectable({ providedIn: 'root' })
export class DashboardController {
  totalCafe: number = 0;
    cafePorMesLabels: string[] = [];
    cafePorMesData: number[] = [];
    totalDia = 0;
    cafePorTipoLabels: string[] = [];
    cafePorTipoData: number[] = [];

  constructor(private dashboardSvc: DashboardService) {}


  cargarDatos() {
    // Total café
    this.dashboardSvc.getTotalCafe().subscribe({
  next: (res) => {
    // Convertir string a número
    this.totalCafe = parseFloat(res.total) || 0;
    console.log('Total café recibido:', this.totalCafe);
  },
  error: (err) => {
    console.error('Error al obtener total de café:', err);
  }
});

this.dashboardSvc.getTotalDia().subscribe({
    next: (res) => this.totalDia = parseFloat(res.total) || 0,
    error: (err) => console.error('Error total día:', err)
  });



  }
  //// CAFE POR MES
  cargarCafePorMes() {
  this.dashboardSvc.getCafePorMes().subscribe({
    next: (res) => {
      console.log('Café por mes:', res);
      this.cafePorMesLabels = res.labels;
      this.cafePorMesData = res.data;
    },
    error: (err) => {
      console.error('Error al obtener café por mes:', err);
    }
  });
}


////// CAFE POR TIPO MADURO, VERDE ETC.
cargarCafePorTipo() {
  this.dashboardSvc.getCafePorTipo().subscribe({
    next: (data) => {
      console.log('Café por tipo:', data);
      this.cafePorTipoLabels = data.map((d: any) => d.tipo);
      this.cafePorTipoData = data.map((d: any) => d.total);

    },
    error: (err) => {
      console.error('Error al obtener café por tipo:', err);
    }
  });
}



}
