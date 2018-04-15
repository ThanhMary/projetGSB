import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { AccueilPage } from '../accueil/accueil';
import {MedicamentProvider, Medicament} from '../../providers/medicament/medicament';
import {FamilleMedProvider} from '../../providers/famille-med/famille-med';


@Component({
  selector: 'page-edit-medicament',
  templateUrl: 'edit-medicament.html',
})
export class EditMedicamentPage {
  model: Medicament;
  familleMeds: any []
 
    constructor(public navCtrl: NavController, 
               public navParams: NavParams, 
               public toast:ToastController, 
               private medicamentProvider: MedicamentProvider, 
               private familleMedProvider: FamilleMedProvider) {
   
   this.model = new Medicament();
    if(this.navParams.data.idMed){
      this.medicamentProvider.get(this.navParams.data.idMed)
         .then((result:any)=>{
           this.model = result;
        })
      }
    }
    
   ionViewDidLoad() {
     this.familleMedProvider.getAll()
     .then ((result: any [])=>{
       this.familleMeds = result;
     })
     .catch(()=>{
      this.toast.create({ message: 'Erreur en creant les types.', duration: 3000, position: 'botton' }).present();
    });
}
 
   save(){
     this.saveMedicament()
     .then(() => {
      this.toast.create({ message: 'Praticien saved.', duration: 3000, position: 'botton' }).present();
      this.navCtrl.pop();
    })
    .catch(() => {
      this.toast.create({ message: 'Erreur.', duration: 3000, position: 'botton' }).present();
    });
}
private saveMedicament() {
     if(this.model.idMed){
       return this.medicamentProvider.update(this.model);
     }else{
       return this.medicamentProvider.insert(this.model);
     }
   }
   private goToAccueil(){
     this.navCtrl.push(AccueilPage);
   }
   
  }