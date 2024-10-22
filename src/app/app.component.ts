import { Component, NgModule, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, NgModel, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'reactiveforms';
  reactiveform: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  submitted=false;
  constructor(private http: HttpClient){

  }

  ngOnInit(){
    this.reactiveform= new FormGroup({
      name: new FormControl(null,Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      mobileno: new FormControl(null),
      subject:new FormControl(null),
      message: new FormControl(null, Validators.required)
    });
  }

onSubmit(finput: {name:string, email:string, mobileno:string, subject:string, message:string}){
  if (this.reactiveform.valid) {
    console.log(this.reactiveform.value); 
    this.successMessage = 'Form Submitted Successfully!';
    this.errorMessage=''; 
    this.reactiveform.reset();
    this.submitted=true;
    this.http.post('https://671533d533bc2bfe40b9be5c.mockapi.io/api/contactform/contactForm', finput)
  .subscribe((res)=>{
    console.log(res);
  });
  } else if(finput.name==''|| finput.email==''|| finput.message==''){
    this.successMessage = 'Form is Invalid!'; 
    this.errorMessage = 'Please fill all the required fields.';
  }
}

}
