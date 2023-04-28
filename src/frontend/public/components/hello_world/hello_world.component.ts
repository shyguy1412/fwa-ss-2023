import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './hello_world.component.html',
  styleUrls: ['./hello_world.component.css']
})

export class AppComponent {
  title = 'hello-world';

  constructor(public router:Router){
  }
}
