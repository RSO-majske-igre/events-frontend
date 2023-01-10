import {Component, OnInit} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ComponentState} from "../../../types/component-state.type";
import {EventDto} from "../../../api/events";
import {FormControl, FormGroup} from "@angular/forms";
import {LocationDto} from "../../../api/events/model/locationDto";
import {EventsApiService} from "../../../api/events/services/events-api.service";
import {LocationApiService} from "../../../api/events/services/location-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DormDto} from "../../../api/participants";
import {DormsApiService} from "../../../api/participants/services/dorms-api.service";

@Component({
  selector: 'app-dorm-details',
  templateUrl: 'dorm-details.page.component.html'
})
export class DormDetailsPageComponent implements OnInit {

  public dormId$ = new BehaviorSubject<string | null>(null);
  public componentState: ComponentState = 'loaded';
  public dorm?: DormDto;
  public dormFormGroup: FormGroup;


  constructor(
    private dormsApi: DormsApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.dormFormGroup = this.formGroupFromObject();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => this.dormId$.next(params['id'] && params['id'] !== 'new' ? params['id'] : null));
    this.dormId$.subscribe(dormId => {
      if (dormId) {
        this.getDorm(dormId);
      } else {
        this.dorm = undefined;
      }
    });
  }

  formGroupFromObject = (object?: DormDto): FormGroup =>
    new FormGroup({
      id: new FormControl(object?.id ?? ''),
      dormName: new FormControl(object?.dormName ?? ''),
    });

  onSubmit(): void {
    this.dormsApi.upsertParticipant(this.dormFormGroup.value as DormDto).subscribe({
      next: () => this.router.navigate(['dorms']),
      error: () => alert("Napaka")
    });
  }

  private getDorm(eventId: string): void {
    this.componentState = "loading";
    this.dormsApi.getDormById(eventId).subscribe({
      next: dorm => {
        this.dorm = dorm;
        this.dormFormGroup = this.formGroupFromObject(dorm);
        this.componentState = "loaded";
      },
      error: () => this.componentState = "error"
    })
  }
}
