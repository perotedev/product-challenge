import { Component, OnInit } from '@angular/core';
// import { version } from '../../../../package.json';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  public version: string = "0.0.0";
  public hour: string = this.convertHour(new Date().toString());

  constructor() { }

  ngOnInit() {
    this.clock();
  }

  private clock(){
    setInterval(() => {
      this.hour = this.convertHour(new Date().toString());
    }, 1000);
  }

  private convertHour(hour:string){
    return hour.split(' ')[4];
  }
}
