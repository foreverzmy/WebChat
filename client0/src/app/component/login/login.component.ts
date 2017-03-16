import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit, OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges {
  email: string = 'hello';

  constructor() { }

  ngOnInit() {
    console.log('begin')
  }
  ngOnChanges(change: SimpleChanges) {
    console.log(change);
  }

}
