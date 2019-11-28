import * as firebase from 'firebase'
import { Injectable } from '@angular/core'
import { Progresso } from './progresso.service'

@Injectable()
export class Bd {

    constructor(private progresso: Progresso) { }

    public publicar(publicacao: any): void {

        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo })
            .then((resposta: any) => {
                let nomeImagem = resposta.key

                firebase.storage().ref()
                    .child(`imagens/${nomeImagem}`)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                        (snapshot: any) => {
                            this.progresso.status = 'andamento'
                            this.progresso.estado = snapshot
                            //console.log(snapshot)
                        },
                        (error) => {
                            this.progresso.status = 'erro'
                            //console.log(error)
                        },
                        () => {
                            this.progresso.status = 'concluido'
                            // console.log("upload completo")
                        }
                    )

            })
    }

    public consultarPublicacoes(emailUsuario: string): Promise<any> {

        return new Promise((resolve, reject) => {

            //consultar as publicações (database)
            firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
                .once('value')
                .then((snapshot: any) => {

                    let publicacoes: Array<any> = [];

                    snapshot.forEach((childSnapshop: any) => {

                        let publicacao = childSnapshop.val()

                        //consultar a url da imagem(storege)
                        firebase.storage().ref()
                            .child(`imagens/${childSnapshop.key}`)
                            .getDownloadURL()
                            .then((url: string) => {
                                publicacao.url_imagem = url

                                //consultar o nome do usuario
                                firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                                    .once('value')
                                    .then((snapshot: any) => {
                                        publicacao.nome_usuario = snapshot.val().nome_usuario

                                        publicacoes.push(publicacao)
                                    })

                            })
                    })

                    resolve(publicacoes)
                })
        })
    }
}