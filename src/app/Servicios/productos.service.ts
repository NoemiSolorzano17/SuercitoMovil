import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { server } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  constructor(private http:HttpClient) { }
  private _header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  mostrarProducto(){
    const _body = new HttpParams();
    return new Promise((resolve, reject) => {
      this.http.get(server+"/v0/ProductosActivas",{headers:this._header,params:_body})
                .subscribe(res=>{
                  resolve(res);
                },(err)=>{
                  reject(err);
                });
    });
  }
  mostrarProductoId(idPro:string){
    const registro=server+"/v0/ProductosPorid?id="+idPro;
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
