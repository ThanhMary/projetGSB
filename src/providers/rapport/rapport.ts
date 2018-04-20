import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider} from '../database/database';

@Injectable()
export class RapportProvider {

  constructor(private dbProvider: DatabaseProvider) {  }
// créer des fonctions de CRUD

// add data
public insert(rapport: Rapport){
  return this.dbProvider.getDB()
  .then((db: SQLiteObject) =>{
    let sql = 'INSERT INTO rapports (rdate, motif, bilan, praID, medID) VALUES(?, ?, ?, ?, ?)';
    let data= [rapport.rdate, rapport.motif, rapport.bilan, rapport.praID, rapport.medID];
    
    return db.executeSql (sql, data) 
    .catch((e)=>console.error(e));
    })
  .catch((e) => console.error(e));
}

//update data

public update(rapport: Rapport){
  return this.dbProvider.getDB()
  .then ((db: SQLiteObject)=>{
    let sql = 'update rapports set rdate=?, motif=?, bilan=?, active=? praID=?, medID=? where idRap=?';
    let data = [ rapport.rdate, rapport.motif, rapport.bilan, rapport.active ? 1 : 0,  rapport.praID, rapport.praID];
    
    return db.executeSql(sql, data)
    .catch ((e)=>console.error());
  })
  .catch ((e)=>console.error());
}

//delete data 

public remove(idRap: number){
  return this.dbProvider.getDB()
  .then((db: SQLiteObject)=>{ 
    let sql = 'delete from rapports where idRap=?';
    let data = [idRap];
      return db.executeSql(sql, data)
    .catch ((e)=>console.error());
  })
  .catch ((e)=>console.error());
}

//  get data
public get(idRap: number){
  return this.dbProvider.getDB()
  .then((db:SQLiteObject)=>{
    let sql =' select * from rapports where idRap=?';
    let data = [idRap];

    return db.executeSql(sql, data)
    .then ((data: any)=>{
      if (data.rows.lenght > 0){
        let item = data.rows.item(0);
        let rapport = new Rapport();
        rapport.idRap = item.idRap;
        rapport.rdate = item.rdate;
        rapport.motif = item.motif;
        rapport.bilan = item.bilan;
        rapport.praID= item.praID;
        rapport.medID= item.medID;
        rapport.active= rapport.active;

        return rapport;
      }
    return null;
    })
  .catch ((e)=>console.error());
  })
.catch ((e)=>console.error());
}

// function det all data rapport

public getAll(rdate: Date = null){
  return this.dbProvider.getDB()
  .then ((db: SQLiteObject)=>{
    let sql = 'SELECT rdate FROM rapports r' ;
    var data: any[] = [];

  //filtrer par la rdate
      if(rdate){
        sql += 'and r.rdate like ? '
        data.push ('%' + rdate + '%')
      }

    return db.executeSql(sql, data)
    .then((data: any)=>{
      if (data.rows.lenght = 0){
        let rapports: any[]= [];
        for (var i=0; i< data.rows.lenght; i++){
        var rapport = data.rows.item(i);
          rapports.push(rapport);
        }
        return rapports
      }else {
        return [];
      }
    }) 
    .catch ((e)=>console.error());
  })
.catch ((e)=>console.error());
}

}
export class Rapport {
  idRap: number;
  rdate: Date;
  motif: string;
  bilan: string;
  active: boolean;
  praID: number;
  medID: number;
  


}// fermeture de class RapportProvider
