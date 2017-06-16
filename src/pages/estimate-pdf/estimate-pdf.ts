import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Storage } from '@ionic/storage';
import { EmailComposer } from '@ionic-native/email-composer';

@IonicPage()
@Component({
  selector: 'page-estimate-pdf',
  templateUrl: 'estimate-pdf.html',
})

export class EstimatePdfPage {
  src: {};
  doc: any;
  docDefinition: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    private emailComposer: EmailComposer) {
      this.docDefinition = navParams.get('data');
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstimatePdfPage');
  }

  sendEmail() {
    this.emailComposer.isAvailable().then((available: boolean) =>{
     if(available) {
       console.log('email ready!');

       let email = {
          to: 'morgantrudeau@hotmail.com',
          cc: '',
          bcc: [''],
          attachments: [

          ],
          subject: 'Cordova Icons',
          body: 'How are you? Nice greetings from Leipzig',
          isHtml: true
        };

        // Send a text message using default options
        this.emailComposer.open(email);
      }
      else{
        console.log('email not available.')
      }
    });
  }
}
