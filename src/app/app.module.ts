import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EventsListPageComponent} from "./pages/events/events-page/events-list.page.component";
import {HttpClientModule} from "@angular/common/http";
import {EventsDetailPageComponent} from "./pages/events/events-details/events-detail.page.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ParticipantsListPageComponent} from "./pages/participants/participants-list/participants-list.page.component";
import {
  ParticipantsDetailPageComponent
} from "./pages/participants/participants-add/participants-detail-page.component";
import {ParticipantsEventComponent} from "./components/events/participants-event/participants-event.component";
import {EventAddEntryPageComponent} from "./pages/events/event-add-entry/event-add-entry.page.component";
import {ParticipantPartOfEntryPipe} from "./pipes/participant-part-of-entry.pipe";
import {LocationsListPageComponent} from "./pages/locations/locations-list/locations-list.page.component";
import {LocationsDetailPageComponent} from "./pages/locations/locations-detail/locations-detail.page.component";

const pages = [
  EventsListPageComponent,
  EventsDetailPageComponent,
  EventAddEntryPageComponent,
  ParticipantsListPageComponent,
  ParticipantsDetailPageComponent,
  LocationsListPageComponent,
  LocationsDetailPageComponent
]

const components = [
  ParticipantsEventComponent
]

const pipes = [
  ParticipantPartOfEntryPipe
]

@NgModule({
  declarations: [
    AppComponent,
    ...pages,
    ...components,
    ...pipes
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
export class AppModule {
}
