import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventsListPageComponent} from "./pages/events/events-page/events-list.page.component";
import {EventsDetailPageComponent} from "./pages/events/events-details/events-detail.page.component";
import {ParticipantsListPageComponent} from "./pages/participants/participants-list/participants-list.page.component";
import {ParticipantsDetailPageComponent} from "./pages/participants/participants-add/participants-detail-page.component";

const routes: Routes = [
  {
    path: 'events',
    component: EventsListPageComponent
  },{
    path: 'events/:id',
    component: EventsDetailPageComponent
  },
  {
    path: 'participants',
    component: ParticipantsListPageComponent
  },{
    path: 'participants/:id',
    component: ParticipantsDetailPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
