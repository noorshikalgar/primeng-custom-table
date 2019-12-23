import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { PrimengModule } from './primeng/primeng.module';
import { StudentComponent } from './student/student.component';
import { CustomtableComponent } from './customtable/customtable.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomtableComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PrimengModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
