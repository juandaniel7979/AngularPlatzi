import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter=0;
  token='';
  profile:User | null = null;

  constructor(
  private storeService:StoreService,
  private authService:AuthService,
  private usersService:UsersService
  ) { }

  createUser(){
    this.usersService.create({
      name:'juan',
      email:"juan@gmail.com",
      password:'123456'
    })
    .subscribe(rta=>{
      console.log(rta);
    });
  }

  // login(){
  //   this.authService.login('juan@gmail.com','123456')
  //   .subscribe(rta=>{
  //     console.log(rta.access_token);
  //     this.token = rta.access_token;
  //     this.getProfile();
  //   });
  // }
  login(){
    this.authService.loginAndGet('juan@gmail.com','123456')
    .subscribe(user=>{
      this.profile=user;
    });
  }


  // getProfile(){
  //   this.authService.profile(this.token)
  //   .subscribe(user=>{
  //     console.log(user);
  //     this.profile = user;
  //   })
  // }


  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products=>{
      this.counter = products.length;
    });
  }

  toggleMenu(){
    this.activeMenu=!this.activeMenu;
  }

}
