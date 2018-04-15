import { Component } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';

//import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
//import {DatabaseProvider}  from '../../providers/database/database';
//import {FamilleMedProvider} from '../../providers/famille-med/famille-med';

import { AccueilPage} from '../accueil/accueil';
import { EditMedicamentPage } from '../edit-medicament/edit-medicament';
import { MedicamentProvider, Medicament} from '../../providers/medicament/medicament';



@Component({
  selector: 'page-gestion-medicament',
  templateUrl: 'gestion-medicament.html',
})
export class GestionMedicamentPage {

  medicaments:any []= [];
  onlyInactives: boolean = false;
  searchTextMed: string = null;
  
  constructor(public navCtrl: NavController, 
         //     public sqlite:SQLiteObject,
              private toast: ToastController,
              private medicamentProvider: MedicamentProvider) {  }

  
  ionViewDidLoad() {
    this.getAllMedicaments();
  }
  getAllMedicaments(){
    this.medicamentProvider.getAll(!this.onlyInactives, this.searchTextMed)
    .then((result:any [])=>{
      this.medicaments= result;
    });
  }

  addMedicament(){
    this.navCtrl.push(EditMedicamentPage);
  }

  editMedicament(idMed: number){
    this.navCtrl.push(EditMedicamentPage, {idMed: idMed});
  }

  removeMedicament(medicament: Medicament){
    this.medicamentProvider.remove(medicament.idMed)
    .then(()=>{
      var index = this.medicaments.indexOf(medicament);
      this.medicaments.splice(index, 1);
      this.toast.create({ message: 'Medicament removed.', duration: 3000, position: 'botton' }).present();
    })
  }
  filterMedicament(ev: any){
    this.getAllMedicaments();
  }

}