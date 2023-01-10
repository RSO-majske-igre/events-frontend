import {Component, OnInit} from "@angular/core";
import {ParticipantsApiService} from "../../../api/participants/services/participants-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {ComponentState} from "../../../types/component-state.type";
import {FormControl, FormGroup} from "@angular/forms";
import {DormDto, ParticipantDto} from "../../../api/participants";
import {LocationDto} from "../../../api/events/model/locationDto";
import {DormsApiService} from "../../../api/participants/services/dorms-api.service";

@Component({
  selector: 'app-participants-add',
  templateUrl: 'participants-detail-page.component.html'
})
export class ParticipantsDetailPageComponent implements OnInit {

  public participantId$ = new BehaviorSubject<string | null>(null);
  public componentState: ComponentState = 'loaded';
  public participant?: ParticipantDto;

  public participantFormGroup: FormGroup;

  public dorms: DormDto[] = [];
  public selectedDorm?: DormDto;
  public dormState: ComponentState = 'default';

  constructor(
    private participantApiService: ParticipantsApiService,
    private dormApi: DormsApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.participantFormGroup = this.formGroupFromObject();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => this.participantId$.next(params['id'] && params['id'] !== 'new' ? params['id'] : null));
    this.participantId$.subscribe(participantId => {
      if (participantId) {
        this.componentState = "loading";
        this.participantApiService.getParticipant(participantId).subscribe({
          next: participant => {
            this.participant = participant;
            this.selectedDorm = {
              id: this.participant.dormId,
              dormName: this.participant.dormName,
            }
            this.participantFormGroup = this.formGroupFromObject(participant);
            this.componentState = "loaded";
          },
          error: () => this.componentState = "error"
        })
      } else {
        this.participant = undefined;
      }
    });
    this.getDorms();
  }

  formGroupFromObject = (object?: ParticipantDto): FormGroup =>
    new FormGroup({
      id: new FormControl(object?.id ?? ''),
      name: new FormControl(object?.name ?? ''),
      email: new FormControl(object?.email ?? ''),
      phone: new FormControl(object?.phone ?? ''),
      dormId: new FormControl(object?.dormId ?? ''),
      dormName: new FormControl(object?.dormName ?? ''),
      addressId: new FormControl(object?.addressId ?? ''),
      addressLine1: new FormControl(object?.addressLine1 ?? ''),
      addressLine2: new FormControl(object?.addressLine2 ?? ''),
      addressCity: new FormControl(object?.addressCity ?? ''),
      addressPostalCode: new FormControl(object?.addressPostalCode ?? ''),
    });

  onSubmit() {
    const participant = this.participantFormGroup.value as ParticipantDto;
    participant.dormId = this.selectedDorm?.id ?? participant.dormId;
    participant.dormName = this.selectedDorm?.dormName ?? participant.dormName;
    this.participantApiService.upsertParticipant(participant).subscribe(e => this.router.navigate(['/participants']));
  }

  private getDorms() {
    this.dormState = "loading";
    this.dormApi.getDorms().subscribe({
      next: dorms => {
        this.dorms = dorms;
        this.dormState = "loaded";
      },
      error: () => this.dormState = 'error'
    });
  }
}
