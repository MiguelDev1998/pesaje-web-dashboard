import { Component } from '@angular/core';
import { LoginController } from '../../controllers/login.controller';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // 
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [LoginController]
})
export class LoginPage {
  constructor(public controller: LoginController) {}
}
