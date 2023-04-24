import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { PagesModule } from './pages/pages.module'
import { PagesRoutingModule } from './pages/pages-routing.module';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule ,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NopageFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthRoutingModule,
    AuthModule,
    PagesModule,
    PagesRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
