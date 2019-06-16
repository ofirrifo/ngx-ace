import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, forwardRef } from '@angular/core';
import * as ace from 'ace-builds';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import {
  AceChangeSelectionStyleData,
  AceChangeSessionData,
  AceCopeData,
  AceDeltaData,
  AceEditor,
  AceEditorOptions,
  AcePasteData
} from './ace.interface';
import { aceInputValue } from './decorators/ace-input-value.decorator';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgxAceComponent),
    multi: true
  }]
})
export class NgxAceComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() readOnly = false;

  @aceInputValue('ace/theme/', 'github')
  @Input()
  theme: string;

  @aceInputValue('ace/mode/', 'html')
  @Input() mode: string;

  @Output() aceBlur = new EventEmitter<Event>();
  @Output() aceChange = new EventEmitter<AceDeltaData>();
  @Output() aceChangeSelectionStyle = new EventEmitter<AceChangeSelectionStyleData>();
  @Output() aceChangeSession = new EventEmitter<AceChangeSessionData>();
  @Output() aceCopy = new EventEmitter<AceCopeData>();
  @Output() aceFocus = new EventEmitter<Event>();
  @Output() acePaste = new EventEmitter<AcePasteData>();

  private codeEditor: AceEditor;
  private innerValue: any = '';
  private onTouchedCallback: () => void;
  private onChangeCallback: (_: any) => void;

  constructor(private elementRef: ElementRef) {

  }

  ngOnInit() {
    this.createAceEditorInstance();
    this.initAceEditorConfiguration();
    this.initListeners();
  }

  ngOnDestroy(): void {
    this.removeListeners();
    this.codeEditor.destroy();
  }

  private createAceEditorInstance(): void {
    const editorOptions: Partial<AceEditorOptions> = {
      highlightActiveLine: true
    };

    this.codeEditor = ace.edit(this.elementRef.nativeElement, editorOptions);
  }

  private initAceEditorConfiguration(): void {
    this.codeEditor.setReadOnly(this.readOnly);
    this.codeEditor.setTheme(this.theme);
    this.codeEditor.getSession().setMode(this.mode);
    this.codeEditor.setShowFoldWidgets(true); // for the scope fold feature
  }

  /**
   * listen to ace events
   */
  private initListeners(): void {
    this.codeEditor.on(AceEvents.Blur, this.blur.bind(this));
    this.codeEditor.on(AceEvents.Change, this.change.bind(this));
    this.codeEditor.on(AceEvents.ChangeSelectionStyle, this.changeSelectionStyle.bind(this));
    this.codeEditor.on(AceEvents.ChangeSession, this.changeSession.bind(this));
    this.codeEditor.on(AceEvents.Copy, this.copy.bind(this));
    this.codeEditor.on(AceEvents.Focus, this.focus.bind(this));
    this.codeEditor.on(AceEvents.Paste, this.paste.bind(this));
  }

  /**
   * remove listeners
   */
  private removeListeners(): void {
    this.codeEditor.off(AceEvents.Blur, this.blur);
    this.codeEditor.off(AceEvents.Change, this.change);
    this.codeEditor.off(AceEvents.ChangeSelectionStyle, this.changeSelectionStyle);
    this.codeEditor.off(AceEvents.ChangeSession, this.changeSession);
    this.codeEditor.off(AceEvents.Copy, this.copy);
    this.codeEditor.off(AceEvents.Focus, this.focus);
    this.codeEditor.off(AceEvents.Paste, this.paste);
  }

  /**
   * Emitted once the editor has been blurred.
   * @param event: the dom event object
   */
  private blur(event: Event): void {
    this.aceBlur.emit(event);
    this.onTouchedCallback();
  }

  /**
   * Emitted whenever the document is changed.
   * @param delta: Contains a single property, data, which has the delta of changes
   */
  private change(delta: AceDeltaData): void {
    this.aceChange.emit(delta);
    const newValue = this.codeEditor.getValue();
    this.onChangeCallback(newValue);
  }

  /**
   * Emitted when the selection style changes, via Editor.setSelectionStyle().
   * @param obj: Contains one property, data, which indicates the new selection style
   */
  private changeSelectionStyle(obj: AceChangeSelectionStyleData): void {
    this.aceChangeSelectionStyle.emit(obj);
  }

  /**
   * Emitted whenever the EditSession changes.
   * @param obj: An object with two properties, oldSession and session, that represent the old and new EditSessions.
   */
  private changeSession(obj: AceChangeSessionData): void {
    this.aceChangeSession.emit(obj);
  }

  /**
   * Emitted when text is copied.
   * @param obj: The copied text
   */
  private copy(obj: AceCopeData): void {
    this.aceCopy.emit(obj);
  }

  /**
   * Emitted once the editor comes into focus.
   * @param event: the dom event object
   */
  private focus(event: Event): void {
    this.aceFocus.emit(event);
  }

  /**
   * Emitted when text is pasted.
   * @param obj: An object which contains one property, text, that represents the text to be pasted.
   * Editing this property will alter the text that is pasted.
   */
  private paste(obj: AcePasteData): void {
    this.acePaste.emit(obj);
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  writeValue(newValue: any): void {
    if (newValue !== this.innerValue) {
      this.innerValue = newValue;
    }
  }
}
