import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class TemperatureService {
  constructor(private http: HttpClient) { }
  apiUrl = 'http://steenkamp.ddns.net:5002'

  getTemperature() {
    return this.http.get<any>(this.apiUrl)
  }
}

@Injectable()
export class SolarService {
  constructor(private http: HttpClient) { }
  apiUrl = 'http://192.168.0.111/SolarMDApi/auth'

  postLogin() {
    const headers = {'Authorization':'Apikey ED1A018FFAE74B00BBA4C81F17E72C89C18E90F80BDB0ADFDCFFC1BDBAF0FD5B'}
    return this.http.get<any>(this.apiUrl, {headers})
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  temperature: any

  constructor(private temperatureService: TemperatureService, private solarService: SolarService) { }

  getTemperature() {  
    this.temperatureService.getTemperature()
      .subscribe((data: any) => {
        this.temperature = data
  }) 
  }

  postLogin() {  
    this.solarService.postLogin()
      .subscribe((data: any) => {
        console.log(data)
  }) 
  }

  ngOnInit(): void {
    this.getTemperature()
    this.postLogin()
  }
}

