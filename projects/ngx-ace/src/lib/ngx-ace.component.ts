import { Component, ElementRef, OnInit } from '@angular/core';
import * as ace from 'ace-builds';
import 'ace-builds/webpack-resolver';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';


const THEME = 'ace/theme/github';
const LANG = 'ace/mode/javascript';

@Component({
  selector: 'aa-ngx-ace',
  template: '',
  styles: [':host { display:block;width:100%; }'],
})
export class NgxAceComponent implements OnInit {
  private codeEditor: ace.Ace.Editor;

  constructor(private elementRef: ElementRef) {

  }

  ngOnInit() {
    const editorOptions: Partial<ace.Ace.EditorOptions> = {
      highlightActiveLine: true,
      minLines: 10,
      maxLines: Infinity,
    };

    this.codeEditor = ace.edit(this.elementRef.nativeElement, editorOptions);
    this.codeEditor.setTheme(THEME);
    this.codeEditor.getSession().setMode(LANG);
    this.codeEditor.setShowFoldWidgets(true); // for the scope fold feature
  }

}
