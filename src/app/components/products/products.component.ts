import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {



  products: Product[]= [
    {
      id:'1',
      name: 'Bicicleta casi nueva',
      price: 356,
      image: './assets/images/bike.jpg'
    },
    {
      id:'2',
      name: 'Colleción de albumnes',
      price: 34,
      image: './assets/images/album.jpg'
    },
    {
      id:'3',
      name: 'Mis libros',
      price: 23,
      image: './assets/images/books.jpg'
    },
    {
      id:'4',
      name: 'Gafas',
      price: 3434,
      image: './assets/images/glasses.jpg'
    }
  ]



  constructor() { }

  ngOnInit(): void {
  }

  onAddtToShoppingCart(product: Product){
    console.log(product)
  }

}
