import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


export interface Temperature {
  results: any[]
}

@Injectable()
export class TemperatureService {
  constructor(private http: HttpClient) { }
  apiUrl = 'http://steenkamp.ddns.net:5002/'

  getTemperature(query: string) {
    return this.http.get<Temperature>(this.apiUrl + query)
  }
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  temperature: Temperature | undefined

  constructor(private temperatureService: TemperatureService) { }

  @ViewChild('search') search !: ElementRef;

  getTemperature(query: string) {  
    this.temperatureService.getTemperature(query)
      .subscribe((data: Temperature) => {
        this.temperature = {
        results: data.results
      }
        
        
  })
    
  }
  
}

