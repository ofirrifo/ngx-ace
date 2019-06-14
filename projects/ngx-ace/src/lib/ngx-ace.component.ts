import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/webpack-resolver';

const THEME = 'ace/theme/github';
const LANG = 'ace/mode/javascript';

@Component({
  selector: 'aa-ngx-ace',
  template: `
    <div class="code-editor" #codeEditor></div>`,
  styles: []
})
export class NgxAceComponent implements OnInit {

  @ViewChild('codeEditor', {static: true}) codeEditorElmRef: ElementRef;
  private codeEditor: ace.Ace.Editor;

  constructor() {
  }

  ngOnInit() {
    const element = this.codeEditorElmRef.nativeElement;
    const editorOptions: Partial<ace.Ace.EditorOptions> = {
      highlightActiveLine: true,
      minLines: 10,
      maxLines: Infinity,
    };

    this.codeEditor = ace.edit(element, editorOptions);
    this.codeEditor.setTheme(THEME);
    this.codeEditor.getSession().setMode(LANG);
    this.codeEditor.setShowFoldWidgets(true); // for the scope fold feature
  }

}
