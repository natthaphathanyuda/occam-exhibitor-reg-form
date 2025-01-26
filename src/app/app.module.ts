import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './core/services/api.service';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { PagesModule } from './pages/pages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 