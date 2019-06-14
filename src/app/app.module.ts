import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxAceModule } from '../../projects/ngx-ace/src/lib/ngx-ace.module';

@NgModule({
  imports: [
    BrowserModule,
    NgxAceModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
