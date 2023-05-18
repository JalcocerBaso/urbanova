import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Archivo } from 'src/app/models/archivos';
import { ConstructionsService } from 'src/app/services/constructions.service';

@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit{
  constructor(private router: Router,
    private route: ActivatedRoute,
    private constructionService: ConstructionsService,
    private modalService: NgbModal){}

  idConstruction: number | undefined;
  nombre: string = '';
  public dtArchivos: Archivo[] = [];
  linkVista: string = "";
  nombreArchivo: string = "";
  linkActualizada: any;
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      this.idConstruction = this.route.snapshot.params['id'];
      this.nombre = this.route.snapshot.params['name'];
    });

    this.constructionService.ObtenerArchivosPorConstructora(this.idConstruction!).subscribe(response =>{
      this.dtArchivos = response.archivos;
    });
  }

  modalVerArchivos(template: TemplateRef<any>, archivo: Archivo){
    this.linkVista = archivo.link_vista.replace("view?usp=drivesdk","preview");
    console.log(this.linkVista);
    console.log(archivo);
    this.nombreArchivo = archivo.nombre;
    this.linkActualizada = archivo.link_actualizada;
    this.modalService.open(template, {size: 'xl'});
  }
}
