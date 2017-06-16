import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { EmailComposer } from '@ionic-native/email-composer';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ItemsPage } from '../pages/items/items';
import { InvoicesPage } from '../pages/invoices/invoices';
import { ClientsPage } from '../pages/clients/clients';
import { AddItemPage } from '../pages/add-item/add-item';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { AddEstimatePage } from '../pages/add-estimate/add-estimate';
import { AddClientPage } from '../pages/add-client/add-client';
import { AddEstimateItemPage } from '../pages/add-estimate-item/add-estimate-item';
import { EstimateDetailPage } from '../pages/estimate-detail/estimate-detail';
import { ClientDetailPage } from '../pages/client-detail/client-detail';
import { PopoverPage } from '../pages/popover/popover';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EstimatePdfPage } from '../pages/estimate-pdf/estimate-pdf'

import { PdfViewerComponent } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ItemsPage,
    InvoicesPage,
    ClientsPage,
    AddItemPage,
    ItemDetailPage,
    AddEstimatePage,
    AddClientPage,
    AddEstimateItemPage,
    EstimateDetailPage,
    ClientDetailPage,
    PopoverPage,
    EstimatePdfPage,
    PdfViewerComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ItemsPage,
    InvoicesPage,
    ClientsPage,
    AddItemPage,
    ItemDetailPage,
    AddEstimatePage,
    AddClientPage,
    AddEstimateItemPage,
    EstimateDetailPage,
    ClientDetailPage,
    PopoverPage,
    EstimatePdfPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
