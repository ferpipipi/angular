import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SeccionComponent } from './seccion/seccion.component';
import { AppRoutingModule } from './app-routing.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        SeccionComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule
    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule { }
