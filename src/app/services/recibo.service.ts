import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recibo } from '../models/recibo';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReciboService {
  private apiUrl = `${environment.apiUrl}/api/recibos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Recibo[]> {
    return this.http.get<Recibo[]>(this.apiUrl);
  }
}
