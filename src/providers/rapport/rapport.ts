import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider} from '../database/database';
import { PraticienProvider} from '../praticien/praticien';

@Injectable()
export class RapportProvider {

  constructor(private dbProvider: DatabaseProvider) {  }
// créer des fonctions de CRUD
// add data
public insert(rapport: Rapport){
  return this.dbProvider.getDB()
  .then((db: SQLiteObject) =>{
    let sql = 'insert into rapports (rdate, motif, bilan, medicament, nbEchantillon, active, praID) values (?, ?, ?, ?, ?, ?, ?)';
    let data= [rapport.rdate, rapport.motif, rapport.bilan, rapport.medicament, rapport.nbEchantillon, rapport.active? 1 : 0, rapport.praID];
     return db.executeSql (sql, data) 
    .catch((e)=>console.error('erreur',e));
    })
  .catch((e) => console.error('erreur',e));
}

//update data
public update(rapport: Rapport){
  return this.dbProvider.getDB()
  .then ((db: SQLiteObject)=>{
    let sql = 'update rapports set rdate=?, motif=?, bilan=?, medicament=?, nbEchantillon=?, active=?, praID=? where id=?';
    let data = [rapport.rdate, rapport.motif, rapport.bilan, rapport.medicament, rapport.nbEchantillon, rapport.active ? 1 : 0, rapport.praID];
    
    return db.executeSql(sql, data)
    .catch ((e)=>console.error('error',e));
  })
  .catch ((e)=>console.error('error',e));
}

//delete data 
public remove(id: number){
  return this.dbProvider.getDB()
  .then((db: SQLiteObject)=>{ 
    let sql = 'delete from rapports where id = ?';
    let data = [id];

   return db.executeSql(sql, data)
    .catch ((e)=>console.error(e));
  })
  .catch ((e)=>console.error(e));
}

//  get data
public get(id: number){
  return this.dbProvider.getDB()
  .then((db:SQLiteObject)=>{
    let sql = 'select * from rapports where id=?';
    let data = [id];
  return db.executeSql(sql, data)
  .then ((data: any)=>{
      if (data.rows.lenght > 0){
        let item = data.rows.item(0);
        let rapport = new Rapport();
        rapport.id = item.id;
        rapport.rdate = item.rdate;
        rapport.motif = item.motif;
        rapport.bilan = item.bilan;
        rapport.medicament= item.medicament;
        rapport.nbEchantillon= item.nbEchantillon;
        rapport.active= rapport.active;
        rapport.praID= item.praID;

        return rapport;
      }
        return null;
    })
  .catch ((e)=>console.error(e));
  })
.catch ((e)=>console.error(e));
}

// function det all data rapport

public getAll(active: boolean, rdate: Date = null){
  return this.dbProvider.getDB()
  .then ((db: SQLiteObject)=>{
    let sql = 'select r.*, p.nom as praticien_nom, p.category_id as praticien_category from rapports r inner join praticiens p on r.praID = p.id where r.active=?';
    var data: any[] = [active ? 1 : 0];

  //filtrer par la rdate
      if(rdate){
        sql += 'and r.rdate like ?'
        data.push ('%' + rdate + '%');
      }

    return db.executeSql(sql, data)
    .then((data: any)=>{
      if (data.rows.length = 0){
        let rapports: any[]= [];
        for (var i = 0; i < data.rows.length; i++){
        var rapport = data.rows.item(i);
          rapports.push(rapport);
        }
        return rapports;
      } else {
        return [];
      }
    }) 
    .catch ((e)=>console.error(e));
   })
 .catch ((e)=>console.error(e));
 }
}// fermeture de classe RapportProvider
export class Rapport {
  id: number;
  rdate: Date;
  motif: string;
  bilan: string;
  medicament: string;
  nbEchantillon: number;
  active: boolean;
  praID: number;
 }
