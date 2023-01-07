import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventsListPageComponent} from "./pages/events-page/events-list.page.component";
import {EventsDetailPageComponent} from "./pages/events-details/events-detail.page.component";

const routes: Routes = [
  {
    path: 'events',
    component: EventsListPageComponent
  },{
    path: 'events/:id',
    component: EventsDetailPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
