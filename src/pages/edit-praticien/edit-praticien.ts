import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { PraticienProvider, Praticien } from '../../providers/praticien/praticien';
import { TypePraticienProvider } from '../../providers/type-praticien/type-praticien';

@Component({
  selector: 'page-edit-praticien',
  templateUrl: 'edit-praticien.html',
})
export class EditPraticienPage {
  model: Praticien;
  typePraticiens: any[];
 
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private praticienProvider: PraticienProvider,
    private typePraticienProvider: TypePraticienProvider) {
 
    this.model = new Praticien();
 
    if (this.navParams.data.id) {
      this.praticienProvider.get(this.navParams.data.id)
        .then((result: any) => {
          this.model = result;
        })
    }
  }
 
  /**
   * Runs when the page has loaded
   */
  ionViewDidLoad() {
    this.typePraticienProvider.getAll()
      .then((result: any[]) => {
        this.typePraticiens = result;
      })
      .catch(() => {
        this.toast.create({ message: 'Erreur en creant les types.', duration: 3000, position: 'botton' }).present();
      });
  }
 
  save() {
    this.savePraticien()
      .then(() => {
        this.toast.create({ message: 'Praticien saved.', duration: 3000, position: 'botton' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toast.create({ message: 'Erreur.', duration: 3000, position: 'botton' }).present();
      });
  }
 
  private savePraticien() {
    if (this.model.idPra) {
      return this.praticienProvider.update(this.model);
    } else {
      return this.praticienProvider.insert(this.model);
    }
  }
 
}