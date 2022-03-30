import { Component, OnInit,ViewChild } from '@angular/core';
import { LoginService } from '../../Servicios/login.service';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {UsuarioService } from '../../Servicios/usuario.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  signupView: boolean = false
 public todo : FormGroup;
 public user: FormGroup;
 @ViewChild('passwordEyeRegister',{static:false}) passwordEye;
  constructor(
    private usuarioService: UsuarioService,
    private loginService:LoginService,
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    private router:Router
    ) {
      this.todo = this.formBuilder.group({
        Usuario: ['', Validators.required],
        Contrasena: ['',Validators.required],
      });
      this.user = this.formBuilder.group({
        Nombre: ['', Validators.required],
        Cedula: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
        Celular: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
        email: ['', Validators.required],
        Contrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
        Confirmar: [''], 
      });
    
     }

     toggleSignUpView () {
      this.signupView = !this.signupView
    }
  login(){
    this.loginService.getlogin(this.todo.controls['Usuario'].value, this.todo.controls['Contrasena'].value)
      .then((ok) => {
      
        if(ok['items'] == null){
          console.log('error')
        }else{
          this.router.navigateByUrl("menu");
          localStorage.setItem("nomeToken",ok['items'].nome_token)
          var setDato:any[]=[];
          localStorage.setItem("carrito",JSON.stringify(setDato));
          localStorage.setItem("carritoPromociones",JSON.stringify(setDato));
        }
      })
      .catch((error) => {
        console.log(error);
      });
     
  }
  passwordTypeInput  =  'password';
  iconpassword  =  'eye-off';
  togglePasswordMode() {
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
    this.iconpassword  =  this.iconpassword  ===  'eye-off'  ?  'eye'  :  'eye-off';
    this.passwordEye.el.setFocus();
  }
   
 registroUsuario(){
  this.usuarioService.guardarUsuario(this.user.controls['Nombre'].value, this.user.controls['email'].value,this.user.controls['Cedula'].value,this.user.controls['Celular'].value,this.user.controls['Contrasena'].value,this.user.controls['Confirmar'].value)
    .then((ok) => {
      if(ok['code']=="200"){
        this.showAlert("Datos Registrado")
      }else{
        this.showAlert("No se pueden guardar datos")
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  async showAlert (Mensaje) {
    const alert = await this.alertController.create({
      message: Mensaje,
      buttons: ['ok']
    });
    await alert.present();
  };
  ngOnInit() {
  
    // this.user.reset();

  }
 


}
