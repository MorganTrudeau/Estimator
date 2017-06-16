import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvoicesPage } from './invoices';

@NgModule({
  declarations: [
    InvoicesPage,
  ],
  imports: [
    IonicPageModule.forChild(InvoicesPage),
  ],
  exports: [
    InvoicesPage
  ]
})
export class InvoicesPageModule {}
