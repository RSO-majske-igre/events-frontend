import {Component, OnInit} from "@angular/core";
import {EventsApiService} from "../../../api/events/services/events-api.service";
import {EventDto} from "../../../api/events";
import {ComponentState} from "../../../types/component-state.type";

@Component({
  selector: 'app-events-list',
  templateUrl: 'events-list.page.component.html'
})
export class EventsListPageComponent implements OnInit {

  public events: EventDto[] = [];
  public currentPage = 1;
  public allPages = 1;
  public componentState: ComponentState = "default";

  constructor(private eventsApi: EventsApiService) {
  }

  ngOnInit() {
    this.getEvents();
  }

  public getEvents(page = 0, perPage = 25): void {
    this.componentState = "loading";
    this.eventsApi.getEvents(page, perPage).subscribe({
      next: page => {
        this.events = page.content;
        this.currentPage = page.number;
        this.allPages = page.totalPages;
        this.componentState = "loaded";
      },
      error: () => this.componentState = "error"
    });
  }

  public getPagesForPagination(): number[] {
    const array: number[] = [];
    for (let i = 0; i < this.allPages; i++) {
      array.push(i);
    }
    return array;
  }
}
