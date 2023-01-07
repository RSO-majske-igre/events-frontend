import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {EventsListPageComponent} from "./pages/events/events-page/events-list.page.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {EventsDetailPageComponent} from "./pages/events/events-details/events-detail.page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ParticipantsListPageComponent} from "./pages/participants/participants-list/participants-list.page.component";

const pages = [
  EventsListPageComponent,
  EventsDetailPageComponent,
  ParticipantsListPageComponent
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
