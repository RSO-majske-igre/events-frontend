import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventsListPageComponent} from "./pages/events-page/events-list.page.component";

const routes: Routes = [
  {
    path: 'events',
    component: EventsListPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
