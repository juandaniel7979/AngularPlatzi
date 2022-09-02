import { Component, OnInit } from '@angular/core';
import { switchMap, zip } from 'rxjs';
import { single } from 'rxjs';
import { Product,CreateProductDTO,UpdateProductDTO } from 'src/app/models/product.model';
import {StoreService} from '../../services/store.service'
import {ProductsService} from '../../services/products.service'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  // today = new Date();
  // date = new Date(2021, 1 ,21)
  myShoppingCart: Product[] = [];
  total=0;
  products: Product[]= [];
  showProductDetail = false;
  productChosen: Product={
    id:'',
    price:0,
    images:[],
    title:'',
    description:'',
    category:{
      id:'',
      name:''
    }
  };
  limit=10;
  offset=0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';


  constructor(
    private storeService: StoreService,
    private productsService:  ProductsService
  ) {
    this.myShoppingCart=this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    // this.productsService.getProductsByPage(10,0)
    this.productsService.getAllProducts(10,0)
    .subscribe(data=>{
      this.products=data;
      this.offset +=this.limit;
    })
  }

  onAddtToShoppingCart(product: Product){
    this.storeService.AddProduct(product);
    this.total = this.storeService.getTotal();
  }


  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id:string){
    this.statusDetail='loading';
    this.toggleProductDetail();
    this.productsService.getProduct(id)
    .subscribe(data=>{
      // this.toggleProductDetail();
      this.productChosen = data;
      this.statusDetail = 'success';
    },errorMsg=>{
      // console.error(errorMsg.error.message)
      window.alert(errorMsg);
      this.statusDetail = 'error';
    })
  }

  // Calbackhell
  // readAndUpdate(id: string){
  //   this.productsService.getProduct(id)
  //   .subscribe(data=>{
  //     const product=data;
  //     this.productsService.update(product.id,{title:'change'})
  //     .subscribe(rtaUpdate=>{
  //       console.log(rtaUpdate)
  //     })
  //   })
  // }
  readAndUpdate(id: string){
    this.productsService.getProduct(id)
    .pipe(
      switchMap((product)=>this.productsService.update(product.id,{title:'change'})),
      // switchMap((product)=>this.productsService.update(product.id,{title:'change'})),
      // switchMap((product)=>this.productsService.update(product.id,{title:'change'})),
    )
    .subscribe(data=>{
      console.log(data)
      });
      // Promise.all(doSomething(),doSomething2());
      this.productsService.fetchReadAndUpdate(id,{title:'nuevo'})
      .subscribe(response=>{
        const read = response[0];
        const update = response[1];
      })
  }

  createNewProduct(){
    const product:CreateProductDTO={
      title:'Nuevo producto',
      description:'Nuevo producto de prueba',
      images:[''],
      price:1000,
      categoryId:2
    }
    this.productsService.create(product)
    .subscribe(data=> {
      this.products.unshift(data)
    });
  }

  updateProduct(){
    const changes ={
      title:"Algun titulo"
    }
    const id = this.productChosen.id;
    this.productsService.update(id,changes)
    .subscribe(data=>{
      const productIndex = this.products.findIndex(item=> item.id===this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen.title=changes.title;
    })
  }


  deleteProduct(){
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(()=>{
      const productIndex = this.products.findIndex(item=> item.id===this.productChosen.id);
      this.products.splice(productIndex,1);
    })
  }

  loadMore(){
    this.productsService.getProductsByPage(this.limit,this.offset)
    .subscribe(data=>{
      this.products=this.products.concat(data);
      this.offset=this.limit;
    })
  }

}
