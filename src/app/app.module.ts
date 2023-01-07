import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {EventsListPageComponent} from "./pages/events-page/events-list.page.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {EventsDetailPageComponent} from "./pages/events-details/events-detail.page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const pages = [
  EventsListPageComponent,
  EventsDetailPageComponent
]

@NgModule({
  declarations: [
    AppComponent,
    ...pages
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
