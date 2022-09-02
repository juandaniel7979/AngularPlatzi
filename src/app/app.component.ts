import { Component, Output, EventEmitter } from '@angular/core';
// import { Product } from './product.model';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

imgParent="https://www.w3schools.com/howto/img_avatar.png";
showImg=true;
token  = '';


constructor(
){

}

onLoaded(img:string){
  console.log('log padre ' +img)
}

toggleImg(){
  this.showImg=!this.showImg;
}



  widthImg = 10;
  name = 'Daniel';
  age = 18;
  img = 'https://source.unsplash.com/random';
  btnDisabled=true;

  person ={
    name:'nicolas',
    age:18,
    avatar:'https://source.unsplash.com/random'
  }
  box = {
    width:100,
    height:100,
    background: 'red'
  };

  register ={
    name: '',
    email:'',
    password:''
  };

  toggleButton(){
      this.btnDisabled = !this.btnDisabled;
  }

  increaseAge(){
    this.person.age+=1;
  }

  onScroll(event: Event){
    const element = event.target as HTMLElement;
    console.log(element.scrollTop)
  }

  changeName(event: Event){
    const element = event.target as HTMLInputElement;
    this.person.name =element.value;
  }

  names: string[] = ['nico','pedro','manolo','alguien'];
  newName = '';

  addName(){
    this.names.push(this.newName);
    this.newName='';
  }

  deleteName(index:number){
    this.names.splice(index,1);
  }

  onRegister(){
    console.log(this.register)
  }

  // products: Product[]= [
  //   {
  //     name: 'Bicicleta casi nueva',
  //     price: 356,
  //     image: './assets/images/bike.jpg'
  //   },
  //   {
  //     name: 'Colleción de albumnes',
  //     price: 34,
  //     image: './assets/images/album.jpg'
  //   },
  //   {
  //     name: 'Mis libros',
  //     price: 23,
  //     image: './assets/images/books.jpg'
  //   },
  //   {
  //     name: 'Gafas',
  //     price: 3434,
  //     image: './assets/images/glasses.jpg'
  //   }
  // ]
}
