import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Piloto } from '../models/piloto';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PilotoService {
  private apiUrl = `${environment.apiUrl}/api/pilotos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Piloto[]> {
    return this.http.get<Piloto[]>(this.apiUrl);
  }

  obtener(id: number): Observable<Piloto> {
    return this.http.get<Piloto>(`${this.apiUrl}/${id}`);
  }

  crear(piloto: Piloto): Observable<any> {
    return this.http.post(this.apiUrl, piloto);
  }

  actualizar(id: number, piloto: Piloto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, piloto);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
