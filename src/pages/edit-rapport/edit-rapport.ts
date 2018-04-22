import { Component } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { RapportProvider, Rapport} from '../../providers/rapport/rapport';
import { PraticienProvider, Praticien } from '../../providers/praticien/praticien';
//import { CategoryProvider} from '../../providers/category/category';
//import { MedicamentProvider, Medicament} from '../../providers/medicament/medicament';

@Component({
  selector: 'page-edit-rapport',
  templateUrl: 'edit-rapport.html',
})
export class EditRapportPage {
model: Rapport; 
praticiens= [];
onlyInactives: string;
searchText: string;

constructor(public navCtrl: NavController, 
            public navParams: NavParams,
            private toast: ToastController,
            private rapportProvider: RapportProvider,
            private praticienProvider: PraticienProvider,
          
          ) {
  this.model = new Rapport();
    if(this.navParams.data.id){
      this.rapportProvider.get(this.navParams.data.id)
      .then((result:any)=>{
      this.model = result;
       })
     }
 }

ionViewDidLoad() {
  this.praticienProvider.getAll(!this.onlyInactives, this.searchText)
  .then((result: any[]) => {
    this.praticiens = result;
      })
   .catch(() => {
    this.toast.create({ message: 'Erreur de get des praticiens.', duration: 3000, position: 'botton' }).present();
   });
 }
 
saveR(){
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
  if(this.model.id){
      return this.rapportProvider.update(this.model);
  }else{
      return this.rapportProvider.insert(this.model);
  }
 }
}
