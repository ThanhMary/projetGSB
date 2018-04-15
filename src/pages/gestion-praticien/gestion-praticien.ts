import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AccueilPage } from '../accueil/accueil';
import { PraticienProvider, Praticien } from '../../providers/praticien/praticien';
import { EditPraticienPage } from '../edit-praticien/edit-praticien';

@Component({
  selector: 'page-gestion-praticien',
  templateUrl: 'gestion-praticien.html',
})
export class GestionPraticienPage {

  praticiens: any[] = [];
  onlyInactives: boolean = false;
  searchText: string = null;
 
  constructor(public navCtrl: NavController, 
    private toast: ToastController, 
    private praticienProvider: PraticienProvider) { }
 
  ionViewDidEnter() {
    this.getAllPraticiens();
  }
 
public getAllPraticiens() {
    this.praticienProvider.getAll(!this.onlyInactives, this.searchText)
      .then((result: any[]) => {
        this.praticiens = result;
      });
  }
 addPraticien(){
    this.navCtrl.push(EditPraticienPage);
  }
 
editPraticien(idPra: number) {
    this.navCtrl.push(EditPraticienPage, { idPra: idPra });
  }
 
removePraticien(praticien: Praticien) {
    this.praticienProvider.remove(praticien.idPra)
      .then(() => {
       var index = this.praticiens.indexOf(praticien);
        this.praticiens.splice(index, 1);
        this.toast.create({ message: 'Praticien removed.', duration: 3000, position: 'botton' }).present();
      })
  }
 
filterPraticiens(ev: any) {
    this.getAllPraticiens();
  }
 
}