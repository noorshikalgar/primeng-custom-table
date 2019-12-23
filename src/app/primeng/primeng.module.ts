import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ContextMenuModule } from 'primeng/contextmenu';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    ContextMenuModule
  ],
  exports: [
    TableModule,
    InputTextModule,
    ContextMenuModule
  ]
})
export class PrimengModule { }
