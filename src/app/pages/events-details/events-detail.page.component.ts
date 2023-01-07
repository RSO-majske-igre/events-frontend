import {Component, OnInit} from "@angular/core";
import {EventsApiService} from "../../api/events/services/events-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ComponentState} from "../../types/component-state.type";
import {BehaviorSubject} from "rxjs";
import {EventDto} from "../../api/events";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-events-detail',
  templateUrl: 'events-detail.page.component.html'
})
export class EventsDetailPageComponent implements OnInit {

  public eventId$ = new BehaviorSubject<string | null>(null);
  public componentState: ComponentState = 'loaded';
  public event?: EventDto;

  public eventFormGroup: FormGroup;


  constructor(private eventsApiService: EventsApiService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.eventFormGroup = this.formGroupFromObject();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => this.eventId$.next(params['id'] && params['id'] !== 'new' ? params['id'] : null));
    this.eventId$.subscribe(eventId => {
      if (eventId) {
        this.componentState = "loading";
        this.eventsApiService.getEvent(eventId).subscribe({
          next: event => {
            this.event = event;
            this.eventFormGroup = this.formGroupFromObject(event);
            this.componentState = "loaded";
          },
          error: () => this.componentState = "error"
        })
      } else {
        this.event = undefined;
      }
    })
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

  onSubmit = () => this.eventsApiService.upsertEvent(this.eventFormGroup.value as EventDto).subscribe(e => this.router.navigate(['/events']));
}
