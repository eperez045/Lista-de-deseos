import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild(IonList) lista: IonList;
  @Input() terminada = true;

  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertControler: AlertController ) { }

  listaSeleccionada(lista: Lista){
  console.log(lista);
  const listaId = lista.id;
  if (this.terminada){
    this.router.navigateByUrl(`/tabs/tab2/agregar/${listaId}`);
  }else{
    this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
  }
}
borrarLista(lista: Lista){
  this.deseosService.borrarLista(lista);
}
async editarLista(lista: Lista) {
  const alert = await this.alertControler.create({
    cssClass: 'my-custom-class',
    header: 'Editar lista',
    inputs: [
      {
        name: 'titulo',
        type: 'text',
        value: lista.titulo,
        placeholder: 'Nombre de la nueva lista'
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          this.lista.closeSlidingItems();
        }
      },
      {
        text: 'Editar',
        handler: (data) => {
          console.log(data);
          if ( data.titulo.length === 0 ){
            return;
          }
          lista.titulo = data.titulo;
          this.deseosService.guardarStorage();
          this.lista.closeSlidingItems();
      }
      }
    ],
  });
  await alert.present();
}
  ngOnInit() {}

}
