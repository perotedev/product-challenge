import { AllDays, AllMonths } from './../../../environments/dates';
import { Component, HostListener, OnInit } from '@angular/core';

const days = AllDays;
const months = AllMonths;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  public version: string = "0.0.0";
  public hour: string = this.convertHour(new Date().toString());
  public date: string = this.getDate();
  public isSmallWindow: boolean;

  constructor( ) { }

  ngOnInit() {
    this.setWidthWindow(window.innerWidth);
    this.clock();
  }

  @HostListener('window:resize')
  onResize() {
    // this.setWidthWindow(window.innerWidth);
  }

  private clock(){
    setInterval(() => {
      this.hour = this.convertHour(new Date().toString());
    }, 1000);
  }

  private convertHour(hour:string){
    return hour.split(' ')[4];
  }

  setWidthWindow(width:number){
    if (width < 990){
      this.isSmallWindow = true;
    } else {
      this.isSmallWindow = false;
    }
  }

  getDate(){
    let date = new Date();
    return date.getDate().toString()+" de "+months[date.getMonth()]+" de "+date.getFullYear();
  }
}
