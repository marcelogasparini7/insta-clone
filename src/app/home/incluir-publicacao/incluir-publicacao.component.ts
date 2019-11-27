import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Bd } from '../../bd.service'
import { Progresso } from '../../progresso.service'

import * as firebase from 'firebase'
import { Observable, Subject } from 'rxjs';
import { interval } from 'rxjs';
import { takeUntil } from "rxjs/operators"

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public email: string
  private imagem: any

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  constructor(private bd: Bd, private progresso: Progresso) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
    })
  }

  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    })

    let acompanhamentoUpload = interval(1500)

    let continua = new Subject()
    continua.next(true)

    acompanhamentoUpload
    .pipe(
    takeUntil(continua)
    ).subscribe(() => {
      console.log(this.progresso.status)
      console.log(this.progresso.estado)

      if(this.progresso.status === 'concluido') {
        continua.next(false)
      }
    })
  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files
  }

}
