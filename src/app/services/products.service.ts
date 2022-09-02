import { Injectable } from '@angular/core';
import {HttpClient,HttpParams,HttpErrorResponse, HttpStatusCode} from '@angular/common/http'
import {retry,catchError, map} from 'rxjs/operators'
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import  { environment} from '../../environments/environment';
import { throwError, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // constructor(
  //   private http: HttpClient
  // ) {
  // }

  // getAllProducts(){
  //   return this.http.get<Product[]>('https://fakestoreapi.com/products');
  // }

  private apiUrl = `${environment.API_URL}/api/products`;
  // private apiUrl = 'https://young-sands-07814.herokapp.com/api/products';
  // private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit:number, offset:number) {
    let params= new HttpParams();
    if(limit && offset){
      params = params.set('limit',limit);
      params = params.set('offset',offset);
    }
    return this.http.get<Product[]>(this.apiUrl,{params})
    .pipe(
      retry(3),
      map(products=> products.map(item =>{
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }

  fetchReadAndUpdate(id:string,dto:UpdateProductDTO){
    return zip(
      this.getProduct(id),
      this.update(id,dto),
    )
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status ===HttpStatusCode.InternalServerError){
          return throwError('Algo está fallando en el server');
        }
        if(error.status ===404){
          return throwError('Producto no encontrado');
        }
        if(error.status ===HttpStatusCode.Unauthorized){
          return throwError('No tienes permitido ingresar acá');
        }
        return throwError('Ups, algo salió mal');
      })
    )
  }



  getProductsByPage(limit:number, offset:number){
    return this.http.get<Product[]>(`${this.apiUrl}/`,{params:{limit,offset}})
  }

  create(dto:CreateProductDTO){
    return this.http.post<Product>(this.apiUrl,dto);
  }


  // put, no es necesario pero se debería enviar toda la información requerida
  // patch, es mas para modificar un elemento puntual o todos
  update(id:string, dto:UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/${id}`,dto);
  }

  delete(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`)
  }



}
