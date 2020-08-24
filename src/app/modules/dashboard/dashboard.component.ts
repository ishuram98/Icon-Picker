import { DashboardService } from 'src/app/modules/dashboard/dashboard.service';
import { Component, OnInit, Input, Directive } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { MatDialog } from '@angular/material/dialog';
import * as IconPickerOb from 'src/assets/IconPicker.json';
import { ReadPropExpr } from '@angular/compiler';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Highcharts = Highcharts;
  chartOptions = {};
  input1: number;
  input2: number;
  total: number;
  public icon;
  // public val = 'icofont icofont-airplane';
  public val;
  public dialogRef;

  constructor(private dashboardService: DashboardService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dashboardService.result$.subscribe(
      (data) => {
        this.input1 = data.input1;
        this.input2 = data.input2;
        this.total = data.total;

        this.chartOptions = {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: 'Result Pie Chart '
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.y}'
              },
              showInLegend: true
            }
          },
          exporting: {
            enabled: true
          },
          credits: {
            enabled: false
          },
          series: [{
            name: 'Value',
            colorByPoint: true,
            data: [{
              name: 'Input1',
              y: this.input1,
              sliced: true,
              selected: true,
            }, {
              name: 'Input2',
              y: this.input2,
            }, {
              name: 'Result',
              y: this.total,
            }]
          }],
        };

        // tslint:disable-next-line: no-string-literal
        console.log(this.chartOptions['series'][0].data[0]['y']);
        // tslint:disable-next-line: no-string-literal
        console.log(this.chartOptions['series'][0].data[1]['y']);
        // tslint:disable-next-line: no-string-literal
        console.log(this.chartOptions['series'][0].data[2]['y']);

        //   Highcharts('container', this.chartOptions);

        HC_exporting(Highcharts);

        setTimeout(() => {
          window.dispatchEvent(
            new Event('resize')
          );
        }, 300);

      }
    );
    this.dashboardService.resultI$.subscribe(
      (iconn) => {
        this.dialogRef.close();
        if (iconn.search('icofont') === -1) {
          console.log(this.icon);
          this.icon = iconn;
          this.val = iconn;
        }
        else {
          this.icon = '';
          this.val = iconn;
        }
      });

    this.PieChart();
  }

  public changeIcon(newIcon: string): void {
    this.dashboardService.resultI$.subscribe(
      (iconn) => {
        this.val = iconn;
      });
  }
  public changeIconn(newIcon: string): void {
    this.icon = newIcon;
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '500px',
    });
  }

  PieChart(): void {
    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Initial Pie Chart '
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y}'
          },
          showInLegend: true
        }
      },
      exporting: {
        enabled: true
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Value',
        colorByPoint: true,
        data: [{
          name: 'Input1',
          y: 1,
          sliced: true,
          selected: true
        }, {
          name: 'Input2',
          y: 1
        }, {
          name: 'Result',
          y: 1,
        }]
      }],
    };

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);

  }

}

@Component({
  selector: 'app-dialog-box',
  templateUrl: 'dialogueBox.html',
  styleUrls: ['dialogueBoxCss.css']
})
// tslint:disable-next-line: component-class-suffix
export class DialogElementsExampleDialog implements OnInit {
  panelOpenState1 = true;
  panelOpenState2 = true;
  panelOpenState3 = true;
  panelOpenState4 = true;
  icon1 = false;
  icon2 = false;
  icon3 = false;
  icon4 = false;
  public ficon: string;
  public sicon: string;
  public IfullPath;
  public MfullPath;
  public name = '';
  public titleChosen = 'Icon Categories';
  Object = Object;

  products: any = (IconPickerOb as any).default;
  // prod = [this.products];

  control = new FormControl();
  streets: string[] = ['alarm', 'dashboard', 'warning', 'android', 'camera', 'check'];
  filteredIcons: Observable<string[]>;


  public IcoFontCategories = {
    IcoFont: ['WebApplication', 'Currency'],
  };

  public MaterialFontCategories = {
    MaterialFont: ['Action', 'Alert'],
  };

  public IconPicker = {
    IcoFont: {
      WebApplication: {
        content: [
          'icofont-addons',
          'icofont-address-book',
          'icofont-alarm',
          'icofont-camera',
          'icofont-card',
          'icofont-cart',
          'icofont-chat',
          'icofont-data',
          'icofont-dashboard',
          'icofont-download',
          'icofont-brand-android-robot'],
        hidden: true
      },
      Currency: {
        content: [
          'icofont-rupee',
          'icofont-dollar',
          'icofont-euro',
          'icofont-pound',
          'icofont-bitcoin',
          'icofont-yen',
          'icofont-baht',
          'icofont-afghani',
          'icofont-dong',
          'icofont-frank',
          'icofont-peso',
          'icofont-riyal'],
        hidden: true
      }
    },
    Material: {
      Action: {
        content: [
          'alarm',
          'analytics',
          'android',
          'api',
          'assessment',
          'code',
          'event',
          'delete',
          'done',
          'description',
          'explore',
          'info'],
        hidden: true
      },
      Alert: {
        content: [
          'add_alert',
          'error',
          'warning',
          'auto_delete',
          'notification_important',
          'error_outline'
        ],
        hidden: true
      }
    }
  };

  data = [
    { header: 'HEADER 1', content: 'CONTENT 1', hidden: false },
    { header: 'HEADER 2', content: 'CONTENT 2', hidden: false },
  ];

  constructor(private dashboardService: DashboardService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.filteredIcons = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  toggle(subdiv): void {
    console.log(subdiv.hidden);
    subdiv.hidden = !subdiv.hidden;
    console.log(subdiv.hidden);
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  public changeIcon(newIcon: string): void {
    console.log(this.products);
    this.ficon = newIcon;
    this.dashboardService.sendIcon(this.ficon);
  }

  public selectIcon(selIcon: string, category: string): void {

    this.titleChosen = category + '/' + selIcon;
    if (category === 'IcoFont') {
      this.MfullPath = [];
      switch (selIcon) {
        case 'WebApplication': this.IfullPath = this.IconPicker.IcoFont.WebApplication; break;
        case 'Currency': this.IfullPath = this.IconPicker.IcoFont.Currency; break;
      }
    }
    else {
      this.IfullPath = [];
      switch (selIcon) {
        case 'Action': this.MfullPath = this.IconPicker.Material.Action; break;
        case 'Alert': this.MfullPath = this.IconPicker.Material.Alert; break;
      }
    }

    console.log(selIcon);

  }


  togglePanel1(): void {
    console.log(name);
    this.panelOpenState1 = !this.panelOpenState1;
    this.icon1 = !this.icon1;
  }

  togglePanel2(): void {
    this.panelOpenState2 = !this.panelOpenState2;
    this.icon2 = !this.icon2;
  }

  togglePanel3(): void {
    this.panelOpenState3 = !this.panelOpenState3;
    this.icon3 = !this.icon3;
  }

  togglePanel4(): void {
    this.panelOpenState4 = !this.panelOpenState4;
    this.icon4 = !this.icon4;
  }

  completeM(name: string): void {
    for (const prop of this.products.Material) {
      for (const propp of prop) {
        if (prop.hasOwnProperty(propp)) {
          if (prop[propp].search(name)) {
            console.log(prop);
            this.name = name;
          }
        }
      }
    }
  }

  completeI(name: string): void {
    for (const category of this.products.IcoFont) {
      for (const prop in category) {
        if (category[prop].search(name) !== -1) {
          console.log(prop);
          this.name = name;
        }

      }
    }
  }
}
