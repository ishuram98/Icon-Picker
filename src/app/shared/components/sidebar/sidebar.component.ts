import { Component, OnInit } from '@angular/core';
import { DashboardService, Values } from 'src/app/modules/dashboard/dashboard.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private values: Values;

  public input1: number;
  public input2: number;
  public operatorChosen: string;
  public result: number;
  topicHasError = true;
  operators = ['+', '-', '*', '/'];

 validateTopic(value): void {
  if (value === 'Select') {
    this.topicHasError = true;
  } else {
    this.topicHasError = false;
  }
}

constructor(private dashboardService: DashboardService){}

  ngOnInit(): void {
  }

  getResult(): void {
    if (this.operatorChosen === '+') {
      this.result = Number(this.input1) + Number(this.input2);
  }
    if (this.operatorChosen === '-') {
    this.result = this.input1 - this.input2;
  }
    if (this.operatorChosen === '*') {
  this.result = this.input1 * this.input2;
  }
    if (this.operatorChosen === '/') {
  this.result = this.input1 / this.input2;
  }
    this.values = {
    input1: this.input1,
    input2: this.input2,
    total: this.result
  };

    this.dashboardService.sendResult(this.values);
  }

}
