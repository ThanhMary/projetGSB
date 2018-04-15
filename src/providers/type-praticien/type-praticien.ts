import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider} from '../database/database';

@Injectable()
export class TypePraticienProvider {

constructor(private dbProvider: DatabaseProvider) {  }

public getAll()
{
return this.dbProvider.getDB()
.then ((db: SQLiteObject)=>{
  return db.executeSql('select * from typePraticiens', [])
  .then((data: any)=>{
    if (data.rows.lenght>0){
      let typePraticiens: any[]=[];
      for(var i=0; i<data.rows.length; i++){
        var typePraticien = data.rows.item(i);
        typePraticiens.push(typePraticien);
      }
      return typePraticiens;
    }else {
      return [];
    }
  })
  .catch((e)=>console.error(e));
})
.catch((e)=>console.error(e));
  }
}

