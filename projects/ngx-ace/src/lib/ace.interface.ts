import { Ace } from 'ace-builds';
import EditSession = Ace.EditSession;
import Delta = Ace.Delta;
import Editor = Ace.Editor;
import EditorOptions = Ace.EditorOptions;

export type AceEditor = Editor;

export type AceEditorOptions = EditorOptions;

export type AceDeltaData = Delta;

export interface AceChangeSessionData {
  session: EditSession;
  oldSession: EditSession;
}

export interface AceChangeSelectionStyleData {
  data: string;
}

export interface AceCopeData {
  text: string;
}

export interface AcePasteData {
  text: string;
}

export enum AceEvents {
  Blur = 'blur',
  Change = 'change',
  ChangeSelectionStyle = 'changeSelectionStyle',
  ChangeSession = 'changeSession',
  Copy = 'copy',
  Focus = 'focus',
  Paste = 'paste',
}


