import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientsPage } from './clients';

@NgModule({
  declarations: [
    ClientsPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientsPage),
  ],
  exports: [
    ClientsPage
  ]
})
export class ClientsPageModule {}
