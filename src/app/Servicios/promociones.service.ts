
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';
import { server } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PromocionesService {

  
  constructor(private http:HttpClient) { }
   private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  mostrarPromociones(){
  const _body = new HttpParams();
    return new Promise((resolve, reject) => {
      this.http.get(server+"/v0/tipo_ConsultarTipoPromocionesPorRegistrosActivos",{headers:this._header,params:_body})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }

mostrarPromocionesproducto(idregistro:string){
 const registro=server+"/v0/kit_filtro?idRegistro="+idregistro;

      return new Promise((resolve, reject) => {
        this.http.get(registro,
        {headers:new HttpHeaders().set('Content-Type','application/json')})
                  .subscribe(res=>{
                    resolve(res);
                  },(err)=>{
                    reject(err);
                  });
      });
    }
mostrarRegistroId(idregistro:string){
      const registro=server+"/v0/RegistroPromociones_filtroRegistro?id="+idregistro;
           return new Promise((resolve, reject) => {
             this.http.get(registro,
             {headers:new HttpHeaders().set('Content-Type','application/json')})
                       .subscribe(res=>{
                         resolve(res);
                       },(err)=>{
                         reject(err);
                       });
           });
}

  
}
