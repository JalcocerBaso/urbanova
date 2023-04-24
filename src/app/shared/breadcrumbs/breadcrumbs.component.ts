import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { every, filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnDestroy {
  constructor(private route: Router){
    this.tituloSubs$ = this.getArg().subscribe(({titulo}) => {
      this.titulo = titulo;
      document.title = `Urbanova - ${titulo}`;
      
    });
  }
  public titulo?: string;
  public tituloSubs$?:Subscription;

  ngOnDestroy(): void {
    this.tituloSubs$?.unsubscribe();
  }

  getArg(){
    return this.route.events.pipe(
      filter((event: any) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event:ActivationEnd) => event.snapshot.data)
    );
  }
}
