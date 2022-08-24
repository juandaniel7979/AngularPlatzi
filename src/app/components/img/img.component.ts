import { Component, Input, OnInit, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {

  img: string = 'valor init';

  @Input('img')
  set changeImg(newImg:string){
    this.img = newImg;
    console.log('change just img =>',this.img )
    // code

  }
  @Input() alt: string = '';


  @Output() loaded = new EventEmitter<string>();
  imageDefault="./assets/images/album.jpg";
  // counter = 0;
  // counterFn: number|undefined;

  constructor() {
    //before render
    //No correr funciones async
    //corre una vez
    console.log('constructor','imgValue =>', this.img)
  }

  ngOnChanges(changes: SimpleChanges){
    //before render
    //changeInputs
    //Se ejecuta cada vez que se actualicen los inputs
    console.log('ngOnChanges','imgValue =>', this.img);
    console.log(changes);
  }


  ngAfterViewInit(){
    // after render
    //handler children
    console.log('ngAfterViewInit')
  }

  ngOnDestroy(){
    // delete component
    console.log('ngOnDestroy')
    // window.clearInterval(this.counterFn);
  }


  ngOnInit(): void {
    //Before render
    // Solo corre una vez
    //Se pueden correr funciones async
    console.log('ngOnInit','imgValue =>', this.img)
    // this.counterFn= window.setInterval(()=>{
    //   this.counter+=1;
    //   console.log('run counter')
    // },1000);
  }


  imgError(){
    this.img = this.imageDefault;
  }

  imgLoaded(){
    console.log('log hijo')
    this.loaded.emit(this.img);
  }
}
