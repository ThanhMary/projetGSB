import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class PraticienProvider {
 
  constructor(private dbProvider: DatabaseProvider) { }
 
  public insert(praticien: Praticien) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into praticiens (nom, prenom, adresse, departement, tel, specialitePlus, active, category_id) values (?, ?, ?, ?, ?, ?, ?, ?)';
        let data = [praticien.nom, praticien.prenom, praticien.adresse, praticien.departement, praticien.tel, praticien.specialitePlus,  praticien.active ? 1 : 0, praticien.category_id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(praticien: Praticien) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update praticiens set nom=?, prenom=?, adresse=?, departement=?, tel=?, specialitePlus=?, category_id=?, active=? where id=?';
        let data = [praticien.nom, praticien.prenom, praticien.adresse, praticien.departement, praticien.tel, praticien.specialitePlus, praticien.category_id, praticien.active ? 1 : 0,  praticien.id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from praticiens where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from praticiens where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let praticien = new Praticien();
              praticien.id = item.id;
              praticien.nom = item.nom;
              praticien.prenom = item.prenom;
              praticien.adresse = item.adresse;
              praticien.departement = item.departement;
              praticien.tel = item.tel;
              praticien.specialitePlus = item.specialitePlus;
              praticien.active = item.active;
              praticien.category_id = item.category_id;
 
              return praticien;
            }
             return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public getAll(active: boolean, nom: string = null) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT p.*, c.name as category_name FROM praticiens p inner join categories c on p.category_id = c.id where p.active = ?';
        var data: any[] = [active ? 1 : 0];
 
        // filtrer par nom de praticien
        if (nom) {
          sql += ' and p.nom like ?'
          data.push('%' + nom + '%');
        }
         return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let praticiens: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var praticien = data.rows.item(i);
                praticiens.push(praticien);
              }
              return praticiens;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}// fermeture de la classe PraticienProvider
 
export class Praticien {
  id: number;
  nom: string;
  prenom: string;
  adresse: string;
  departement: string;
  tel: string;
  specialitePlus: string;
  active: boolean;
  category_id: number;
}
