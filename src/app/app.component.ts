import { Component } from '@angular/core';

@Component({
  selector: 'aa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  aceBlur(event: Event) {
    console.log(event);
  }

  aceChange(delta: any) {
    console.log(delta);
  }

  aceChangeSelectionStyle(obj: any) {
    console.log(obj);
  }

  aceChangeSession(obj: any) {
    console.log(obj);
  }

  aceCopy(obj: any) {
    console.log(obj);
  }

  acePaste(obj: any) {
    console.log(obj);
  }

  aceFocus(event: Event) {
    console.log(event);
  }
}
