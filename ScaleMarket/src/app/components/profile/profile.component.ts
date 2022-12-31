import { UsersService } from 'src/app/services/sql/users.service';
import { LsHelper } from 'src/app/helpers/localstorage.helper';
import { DomSanitizer } from '@angular/platform-browser';
import { NotifierService } from 'angular-notifier';
import { Component, OnInit } from '@angular/core';

import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  user: any;
  imgBase64: any;
  bandVerify: boolean = false;

  // ?? WebCam
  private trigger: Subject<void> = new Subject();
  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  captureImage  = '';

  constructor( private _notifier: NotifierService, private _user: UsersService, public domSanitizer: DomSanitizer ) {
    // ?? Object.assign(this, this.test);
  }

  /* ?? 
  view: any = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  test: any[] = [
    {
      "name": "Nepal",
      "series": [
        {
          "value": 3045,
          "name": "2016-09-14T20:56:30.598Z"
        },
        {
          "value": 2259,
          "name": "2016-09-19T11:57:46.700Z"
        },
        {
          "value": 5934,
          "name": "2016-09-14T12:15:35.530Z"
        },
        {
          "value": 2517,
          "name": "2016-09-17T08:56:21.720Z"
        },
        {
          "value": 3386,
          "name": "2016-09-18T07:57:27.301Z"
        }
      ]
    },
    {
      "name": "Vatican City",
      "series": [
        {
          "value": 2544,
          "name": "2016-09-14T20:56:30.598Z"
        },
        {
          "value": 4458,
          "name": "2016-09-19T11:57:46.700Z"
        },
        {
          "value": 4934,
          "name": "2016-09-14T12:15:35.530Z"
        },
        {
          "value": 6644,
          "name": "2016-09-17T08:56:21.720Z"
        },
        {
          "value": 4491,
          "name": "2016-09-18T07:57:27.301Z"
        }
      ]
    },
    {
      "name": "Kosovo",
      "series": [
        {
          "value": 6946,
          "name": "2016-09-14T20:56:30.598Z"
        },
        {
          "value": 5389,
          "name": "2016-09-19T11:57:46.700Z"
        },
        {
          "value": 5305,
          "name": "2016-09-14T12:15:35.530Z"
        },
        {
          "value": 4961,
          "name": "2016-09-17T08:56:21.720Z"
        },
        {
          "value": 4905,
          "name": "2016-09-18T07:57:27.301Z"
        }
      ]
    },
    {
      "name": "Guinea-Bissau",
      "series": [
        {
          "value": 6708,
          "name": "2016-09-14T20:56:30.598Z"
        },
        {
          "value": 3160,
          "name": "2016-09-19T11:57:46.700Z"
        },
        {
          "value": 3294,
          "name": "2016-09-14T12:15:35.530Z"
        },
        {
          "value": 4074,
          "name": "2016-09-17T08:56:21.720Z"
        },
        {
          "value": 2067,
          "name": "2016-09-18T07:57:27.301Z"
        }
      ]
    },
    {
      "name": "Australia",
      "series": [
        {
          "value": 4504,
          "name": "2016-09-14T20:56:30.598Z"
        },
        {
          "value": 2849,
          "name": "2016-09-19T11:57:46.700Z"
        },
        {
          "value": 4997,
          "name": "2016-09-14T12:15:35.530Z"
        },
        {
          "value": 4342,
          "name": "2016-09-17T08:56:21.720Z"
        },
        {
          "value": 6020,
          "name": "2016-09-18T07:57:27.301Z"
        }
      ]
    }
  ];
  */

  verify() {
    this.bandVerify = true;
  }

  faceRecognition() {

  }

  updateLocation() {

  }

  async getUserData() {
    this.user = LsHelper.getItem('user');
    this.imgBase64 = this.transformImg();
  }

  async load() {

  }

  ngOnInit(): void {
    this.getUserData();
    console.log(this.user)
    this.load();
  }

  transformImg() {
    const base64String = btoa(new Uint8Array(this.user.profileImg.data).reduce((data, byte) => {
      return data + String.fromCharCode(byte);
      }, ''));
    return this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);
  }

  public showNotification( type: string, message: string ): void {
		this._notifier.notify( type, message );
	}

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.captureImage = webcamImage!.imageAsDataUrl;
  }

  public get triggerObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }
}
