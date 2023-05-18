import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, firstValueFrom, lastValueFrom } from 'rxjs';
import { Archivo } from 'src/app/models/archivos';
import { constructions } from 'src/app/models/constructions';
import { CompaniesService } from 'src/app/services/companies.service';
import { ConstructionsService } from 'src/app/services/constructions.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit{

  constructor(private constructionService: ConstructionsService,
              private router:Router,
              private activatedRoute: ActivatedRoute,
              private companyServices: CompaniesService){}

  dtOptions: DataTables.Settings = {};
  public dtConstruccions: constructions[] = [];
  public dtArchivos: Archivo[] = [];
  dtTrigger: Subject<any> = new Subject();
  idEmpresa: number = 0;

  ngOnInit(): void {
    this.dtOptions = {
      columnDefs:[{ "targets": 0}],
      language: {
        "lengthMenu": "Mostrar _MENU_ resultados",
        "zeroRecords": "No se encontraron resultados",
        "info": "Mostrando resultados _START_-_END_ de  _TOTAL_",
        "infoEmpty": "Mostrando resultados del 0 al 0 de un total de 0 registros",
        "search": "Buscar",
        "loadingRecords": "Cargando...",
        "paginate": {
          "first": "Primero",
          "last": "Último",
          "next": "Siguiente",
          "previous": "Anterior"
        }
      },
      responsive: true,
    };
    this.activatedRoute.queryParams.subscribe(params =>{
      this.idEmpresa = this.activatedRoute.snapshot.params['id'];
    });

    this.companyServices.obtenerEmpresaPorId(this.idEmpresa).subscribe(response =>{
      this.dtConstruccions = response.data.construccion;
      this.dtTrigger.next(null);
    });
  }

  mostrarArchivos(construcionId: number, nombre: string){
    this.router.navigate(['/dashboard/archivos', construcionId, nombre ],{ relativeTo: this.activatedRoute})
  }

  async mostrarCantidadArchivos(idConstruction: number){
    const data = this.constructionService.ObtenerArchivosPorConstructora(idConstruction);
    let archivos = await firstValueFrom(data);
    console.log(archivos);
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next;
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
