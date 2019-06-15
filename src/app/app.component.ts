import { Component } from '@angular/core';
import {
  AceChangeSelectionStyleData,
  AceChangeSessionData,
  AceCopeData,
  AceDeltaData,
  AcePasteData
} from '../../projects/ngx-ace/src/lib/ace.interface';


@Component({
  selector: 'aa-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  aceBlur(event: Event) {
    console.log(event);
  }

  aceChange(delta: AceDeltaData) {
    console.log(delta);
  }

  aceChangeSelectionStyle(obj: AceChangeSelectionStyleData) {
    console.log(obj);
  }

  aceChangeSession(obj: AceChangeSessionData) {
    console.log(obj);
  }

  aceCopy(obj: AceCopeData) {
    console.log(obj);
  }

  acePaste(obj: AcePasteData) {
    console.log(obj);
  }

  aceFocus(event: Event) {
    console.log(event);
  }

}
