import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import * as ace from 'ace-builds';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';


const THEME = 'ace/theme/github';
const LANG = 'ace/mode/javascript';

export enum AceEvents {
  Blur = 'blur',
  Change = 'change',
  ChangeSelectionStyle = 'changeSelectionStyle',
  ChangeSession = 'changeSession',
  Copy = 'copy',
  Focus = 'focus',
  Paste = 'paste',
}

@Component({
  selector: 'ace-editor',
  template: '',
  styles: [':host { display:block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxAceComponent implements OnInit, OnDestroy {

  @Output() aceBlur = new EventEmitter<Event>();
  @Output() aceChange = new EventEmitter<ace.Ace.Delta>();
  @Output() aceChangeSelectionStyle = new EventEmitter<{ data: string }>();
  @Output() aceChangeSession = new EventEmitter<{ session: ace.Ace.EditSession, oldSession: ace.Ace.EditSession }>();
  @Output() aceCopy = new EventEmitter<{ text: string }>();
  @Output() aceFocus = new EventEmitter<Event>();
  @Output() acePaste = new EventEmitter<{ text: string }>();

  private codeEditor: ace.Ace.Editor;

  // private blurCallbackPointer: () => void;

  constructor(private elementRef: ElementRef) {

  }

  ngOnInit() {
    const editorOptions: Partial<ace.Ace.EditorOptions> = {
      highlightActiveLine: true
    };

    this.codeEditor = ace.edit(this.elementRef.nativeElement, editorOptions);
    this.codeEditor.setTheme(THEME);
    this.codeEditor.getSession().setMode(LANG);
    this.codeEditor.setShowFoldWidgets(true); // for the scope fold feature

    this.initListeners();
  }

  ngOnDestroy(): void {
    this.removeListeners();
  }

  private initListeners(): void {
    this.codeEditor.on(AceEvents.Blur, this.blur.bind(this));
    this.codeEditor.on(AceEvents.Change, this.change.bind(this));
    this.codeEditor.on(AceEvents.ChangeSelectionStyle, this.changeSelectionStyle.bind(this));
    this.codeEditor.on(AceEvents.ChangeSession, this.changeSession.bind(this));
    this.codeEditor.on(AceEvents.Copy, this.copy.bind(this));
    this.codeEditor.on(AceEvents.Focus, this.focus.bind(this));
    this.codeEditor.on(AceEvents.Paste, this.paste.bind(this));
  }

  private removeListeners(): void {
    this.codeEditor.off(AceEvents.Blur, this.blur);
    this.codeEditor.off(AceEvents.Change, this.change);
    this.codeEditor.off(AceEvents.ChangeSelectionStyle, this.changeSelectionStyle);
    this.codeEditor.off(AceEvents.ChangeSession, this.changeSession);
    this.codeEditor.off(AceEvents.Copy, this.copy);
    this.codeEditor.off(AceEvents.Focus, this.focus);
    this.codeEditor.off(AceEvents.Paste, this.paste);
  }

  blur(event: Event): void {
    this.aceBlur.emit(event);
  }

  change(delta: ace.Ace.Delta): void {
    this.aceChange.emit(delta);
  }

  changeSelectionStyle(obj: { data: string }): void {
    this.aceChangeSelectionStyle.emit(obj);
  }

  changeSession(obj: { session: ace.Ace.EditSession, oldSession: ace.Ace.EditSession }): void {
    this.aceChangeSession.emit(obj);
  }

  copy(obj: { text: string }): void {
    this.aceCopy.emit(obj);
  }

  focus(event: Event): void {
    this.aceFocus.emit(event);
  }

  paste(obj: { text: string }): void {
    this.acePaste.emit(obj);
  }


}
