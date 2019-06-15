# Angular Ace Editor 

This library bring the great Ace editor from Cloud9 to Angular

Ace is a code editor written in JavaScript with a great performance and have a lot of features.

# Getting started

## Install

`npm i @rifo/ngx-ace ace-builds`

## Add NgxAceModule

```
import {NgxAceModule} from '@rifo/ngx-ace';

@NgModule({
  imports: [
    ...
    NgxAceModule
  ],
  ...
})
export class AppModule { }

```

## Use in component
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<ace-editor></ace-editor>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
}

```

# Original JavaScript Ace Library
[Ace Playground](https://ace.c9.io/build/kitchen-sink.html)

[More about Ace](https://github.com/ajaxorg/ace)

