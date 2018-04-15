import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class PraticienProvider {
 
  constructor(private dbProvider: DatabaseProvider) { }
 
  public insert(praticien: Praticien) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into praticiens (nom, prenom, adresse, departement, tel, specilitePlus, active, typeTD) values (?, ?, ?, ?, ?, ?, ?, ?)';
        let data = [praticien.nom, praticien.prenom, praticien.adresse, praticien.departement, praticien.tel, praticien.specialitePlus,  praticien.active ? 1 : 0, praticien.typeID];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(praticien: Praticien) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update praticiens set nom = ?, prenom = ?, adresse = ?, departement = ?, tel = ?, specialitePlus = ?, typeID = ? where idPra = ?';
        let data = [praticien.nom, praticien.prenom, praticien.adresse, praticien.departement, praticien.tel, praticien.specialitePlus, praticien.active ? 1 : 0, praticien.typeID, praticien.idPra];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public remove(idPra: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from praticiens where idPra = ?';
        let data = [idPra];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public get(idPra: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from praticiens where idPra = ?';
        let data = [idPra];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let praticien = new Praticien();
              praticien.idPra = item.idPra;
              praticien.nom = item.nom;
              praticien.prenom = item.prenom;
              praticien.adresse = item.adresse;
              praticien.departement = item.departement;
              praticien.tel = item.tel;
              praticien.specialitePlus = item.specialitePlus;
              praticien.active = item.active;
              praticien.typeID = item.typeID;
 
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
        let sql = 'SELECT p.*, t.libelle as type_libelle FROM praticiens p inner join typePraticiens t on p.typeID = t.idType where p.active = ?';
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
}
 
export class Praticien {
  idPra: number;
  nom: string;
  prenom: string;
  adresse: string;
  departement: string;
  tel: string;
  specialitePlus: string;
  active: boolean;
  typeID: number;
}
