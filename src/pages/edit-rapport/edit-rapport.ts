import { Component } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
//import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { DatabaseProvider } from '../../providers/database/database';
import { RapportProvider, Rapport} from '../../providers/rapport/rapport';
//import { TypePraticienProvider} from '../../providers/type-praticien/type-praticien';
import {PraticienProvider, Praticien } from '../../providers/praticien/praticien';
import { MedicamentProvider, Medicament} from '../../providers/medicament/medicament';

@Component({
  selector: 'page-edit-rapport',
  templateUrl: 'edit-rapport.html',
})
export class EditRapportPage {
model: Rapport; 

constructor(public navCtrl: NavController, 
            public navParams: NavParams,
          // public sqlite:SQLiteObject,
            private toast: ToastController,
            private rapportProvider: RapportProvider
          ) {
this.model = new Rapport();
    if(this.navParams.data.idPra){
      this.rapportProvider.get(this.navParams.data.idRap)
      .then((result:any)=>{
      this.model = result;
       })
     }
    }
ionViewDidLoad() {
console.log('ionViewDidLoad EditRapportPage');
}     

save(){
this.saveRapport()
  .then(() => {
      this.toast.create({ message: 'Rapport saved.', duration: 3000, position: 'botton' }).present();
      this.navCtrl.pop();
    })
  .catch(() => {
      this.toast.create({ message: 'Erreur.', duration: 3000, position: 'botton' }).present();
    });
}
private saveRapport() {
  if(this.model.idRap){
      return this.rapportProvider.update(this.model);
  }else{
      return this.rapportProvider.insert(this.model);
      }
}

}
