import {Component, OnInit} from "@angular/core";
import {EventsApiService} from "../../../api/events/services/events-api.service";
import {ActivatedRoute, Event, Router} from "@angular/router";
import {ComponentState} from "../../../types/component-state.type";
import {BehaviorSubject} from "rxjs";
import {EventDto} from "../../../api/events";
import {FormControl, FormGroup} from "@angular/forms";
import {LocationApiService} from "../../../api/events/services/location-api.service";
import {LocationDto} from "../../../api/events/model/locationDto";

@Component({
  selector: 'app-events-detail',
  templateUrl: 'events-detail.page.component.html'
})
export class EventsDetailPageComponent implements OnInit {

  public eventId$ = new BehaviorSubject<string | null>(null);
  public componentState: ComponentState = 'loaded';
  public event?: EventDto;
  public eventFormGroup: FormGroup;

  public locations: LocationDto[] = [];
  public selectedLocation?: LocationDto;
  public locationsState: ComponentState = 'default';


  constructor(
    private eventsApiService: EventsApiService,
    private locationsApi: LocationApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.eventFormGroup = this.formGroupFromObject();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => this.eventId$.next(params['id'] && params['id'] !== 'new' ? params['id'] : null));
    this.eventId$.subscribe(eventId => {
      if (eventId) {
        this.getEvent(eventId);
      } else {
        this.event = undefined;
      }
    });
    this.getLocations();
  }

  formGroupFromObject = (object?: EventDto): FormGroup =>
    new FormGroup({
      id: new FormControl(object?.id ?? ''),
      eventName: new FormControl(object?.eventName ?? ''),
      description: new FormControl(object?.description ?? ''),
      startTime: new FormControl(object?.startTime ?? ''),
      fee: new FormControl(object?.fee ?? ''),
      teamDescription: new FormControl(object?.teamDescription ?? ''),
      imageUrl: new FormControl(object?.imageUrl ?? ''),
      locationId: new FormControl(object?.locationId ?? ''),
      locationName: new FormControl(object?.locationName ?? ''),
      locationUrl: new FormControl(object?.locationUrl ?? ''),
      geoLat: new FormControl(object?.geoLat ?? ''),
      geoLon: new FormControl(object?.geoLon ?? ''),
    });

  onSubmit(): void {
    const event = this.eventFormGroup.value as EventDto;
    event.locationId = this.selectedLocation?.id ?? event.locationId;
    event.locationName = this.selectedLocation?.locationName ?? event.locationName;
    this.eventsApiService.upsertEvent(event).subscribe({
      next: () => this.router.navigate(['events']),
      error: () => alert("Napaka")
    });
  }

  private getEvent(eventId: string): void {
    this.componentState = "loading";
    this.eventsApiService.getEvent(eventId).subscribe({
      next: event => {
        this.event = event;
        this.eventFormGroup = this.formGroupFromObject(event);
        this.selectedLocation = {
          id: event.locationId,
          locationName: event.locationName
        }
        this.componentState = "loaded";
      },
      error: () => this.componentState = "error"
    })
  }

  private getLocations() {
    this.locationsState = "loading";
    this.locationsApi.getLocations().subscribe({
      next: locations => {
        this.locations = locations;
        this.locationsState = "loaded";
      },
      error: () => this.locationsState = 'error'
    });
  }
}
