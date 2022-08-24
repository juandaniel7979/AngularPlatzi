// const username: string | number = 'pandaDotExe';
const username: string = 'pandaDotExe';


const sum = (a:number,b:number)=>{
  return a+b;
}

sum(1,3);


class Person {
    // private age: number;
    // lastname: string;

    // constructor(age: number,lastname: string){
    //   this.age=age;
    //   this.lastname=lastname;
    // }
constructor(public age: number,public lastname: string){}

}

const dani = new Person(15,'Dani');

console.log(dani);
