import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product!: Product;
  @Output() addedProduct = new EventEmitter<Product>();


  constructor() { }

  ngOnInit(): void {
  }

  onAddtoCart(){
  this.addedProduct.emit(this.product);
  }

}
