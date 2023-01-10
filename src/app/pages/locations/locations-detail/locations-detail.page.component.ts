import {Component, OnInit} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ComponentState} from "../../../types/component-state.type";
import {EventDto} from "../../../api/events";
import {FormControl, FormGroup} from "@angular/forms";
import {EventsApiService} from "../../../api/events/services/events-api.service";
import {ParticipantsApiService} from "../../../api/participants/services/participants-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LocationDto} from "../../../api/events/model/locationDto";
import {LocationApiService} from "../../../api/events/services/location-api.service";

@Component({
  selector: 'app-locations-detail',
  templateUrl: 'locations-detail.page.component.html'
})
export class LocationsDetailPageComponent implements OnInit {


  public locationId$ = new BehaviorSubject<string | null>(null);
  public componentState: ComponentState = 'loaded';
  public location?: LocationDto;

  public locationFormGroup: FormGroup;


  constructor(private locationsApi: LocationApiService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.locationFormGroup = this.formGroupFromObject();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => this.locationId$.next(params['id'] && params['id'] !== 'new' ? params['id'] : null));
    this.locationId$.subscribe(id => {
      if (id) {
        this.getLocation(id);
      } else {
        this.location = undefined;
      }
    })
  }

  formGroupFromObject = (object?: LocationDto): FormGroup =>
    new FormGroup({
      id: new FormControl(object?.id ?? ''),
      locationName: new FormControl(object?.locationName ?? ''),
      locationUrl: new FormControl(object?.locationUrl ?? ''),
      geoLat: new FormControl(object?.geoLat ?? ''),
      geoLon: new FormControl(object?.geoLon ?? ''),
    });

  onSubmit = () => this.locationsApi.postLocation(this.locationFormGroup.value as LocationDto).subscribe(e => this.router.navigate(['/locations']));

  private getLocation(locationId: string): void {
    this.componentState = "loading";
    this.locationsApi.getLocation(locationId).subscribe({
      next: location => {
        this.location = location;
        this.locationFormGroup = this.formGroupFromObject(location);
        this.componentState = "loaded";
      },
      error: () => this.componentState = "error"
    })
  }
}
