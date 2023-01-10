import {Component, OnInit} from "@angular/core";
import {EventDto} from "../../../api/events";
import {ComponentState} from "../../../types/component-state.type";
import {EventsApiService} from "../../../api/events/services/events-api.service";
import {LocationApiService} from "../../../api/events/services/location-api.service";
import {LocationDto} from "../../../api/events/model/locationDto";

@Component({
 selector: 'app.locations-list',
 templateUrl: 'locations-list.page.component.html'
})
export class LocationsListPageComponent implements OnInit{
  public locations: LocationDto[] = [];
  public componentState: ComponentState = "default";

  constructor(private locationsApi: LocationApiService) {
  }

  ngOnInit() {
    this.getLocations();
  }

  public getLocations(): void {
    this.componentState = "loading";
    this.locationsApi.getLocations().subscribe({
      next: locations => {
        this.locations = locations;
        this.componentState = "loaded";
      },
      error: () => this.componentState = "error"
    });
  }
}
