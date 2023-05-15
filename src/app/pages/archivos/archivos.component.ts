import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private constructionService: ConstructionsService){}

  idConstruction: number | undefined;
  nombre: string = '';
  public dtArchivos: Archivo[] = [];
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      this.idConstruction = this.route.snapshot.params['id'];
      this.nombre = this.route.snapshot.params['name'];
    });

    this.constructionService.ObtenerArchivosPorConstructora(this.idConstruction!).subscribe(response =>{
      console.log(response.archivos);
      this.dtArchivos = response.archivos;
    });
  }
}
