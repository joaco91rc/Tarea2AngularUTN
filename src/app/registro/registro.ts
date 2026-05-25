import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class RegistroComponent implements OnInit {

  formularioRegistro!: FormGroup;
  formularioEnviado: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formularioRegistro = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['']
    });
  }

  enviar(): void {
    if (this.formularioRegistro.valid) {
      console.log('Datos del formulario:', this.formularioRegistro.value);
      this.formularioEnviado = true;
      this.formularioRegistro.reset();
    }
  }

  obtenerErrores(campo: string): string[] {
    const control = this.formularioRegistro.get(campo);
    const errores: string[] = [];

    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        errores.push('Este campo es obligatorio.');
      }

      if (control.errors['minlength']) {
        errores.push('Debe tener al menos 3 caracteres.');
      }

      if (control.errors['email']) {
        errores.push('Debe ingresar un email válido.');
      }
    }

    return errores;
  }

  campoInvalido(campo: string): boolean {
    const control = this.formularioRegistro.get(campo);
    return !!(control && control.invalid && control.touched);
  }
}