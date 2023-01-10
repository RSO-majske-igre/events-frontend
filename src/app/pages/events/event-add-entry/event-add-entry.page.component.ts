import {Component, OnInit} from "@angular/core";
import {EventsApiService} from "../../../api/events/services/events-api.service";
import {ParticipantsApiService} from "../../../api/participants/services/participants-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ComponentState} from "../../../types/component-state.type";
import {ParticipantDto} from "../../../api/participants";
import {EntryDto} from "../../../api/events";
import {EntryApiService} from "../../../api/events/services/entry-api.service";
import {FormControl, FormGroup} from "@angular/forms";
import {SelectableParticipant} from "../../../models";

@Component({
  selector: 'app-event-add-entry',
  templateUrl: 'event-add-entry.page.component.html'
})
export class EventAddEntryPageComponent implements OnInit {

  public participants?: SelectableParticipant[];
  private eventId!: string;
  private entryId?: string;
  private componentState: ComponentState = 'default';
  public entry?: EntryDto;

  public entryFormGroup: FormGroup;

  constructor(
    private eventApiService: EventsApiService,
    private participantApiService: ParticipantsApiService,
    private entryApiService: EntryApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.entryFormGroup = this.createEntryFormGroup();
    activatedRoute.params.subscribe(params => {
      if (params['eventId']) {
        this.eventId = params['eventId'];
      }
      if (params['entryId']) {
        this.entryId = params['entryId'];
        this.getEntry(this.entryId!);
      } else {
        this.getParticipants();
      }
    });
  }

  ngOnInit() {
  }

  public getParticipants(page = 0, perPage = 100): void {
    console.log("tuki")
    this.participantApiService.getParticipants(page, perPage).subscribe({
      next: participants => {
        this.participants = [
          ...this.participants ?? [],
          ...participants.content.filter(p => !this.participants?.find(sp => p.id === sp.id)).map((e: SelectableParticipant) => {
            e.selected = false;
            return e;
          })
        ];
      },
      error: () => this.componentState = 'error'
    })
  }

  public getEntry(entryId: string): void {
    this.entryApiService.getEntryById(entryId).subscribe({
      next: entry => {
        this.entry = entry;
        this.participants = Array.from(entry.participants?.values() ?? new Set<ParticipantDto>()).map((e: SelectableParticipant) => {
          e.selected = true;
          return e;
        });
        console.log("tudi tukaj")
        this.getParticipants();
        this.entryFormGroup = this.createEntryFormGroup(this.entry);
      }
    })
  }

  private createEntryFormGroup(object?: EntryDto): FormGroup {
    return new FormGroup({
      paid: new FormControl(object?.paid ?? false),
      accepted: new FormControl(object?.accepted ?? false),
    })
  }

  public saveEntry(): void {
    const selectedParticipants = this.participants?.filter(p => p.selected);
    const fg = this.entryFormGroup.value as EntryDto;
    fg.participants = new Set<ParticipantDto>(selectedParticipants);
    fg.eventId = this.entry?.eventId ?? this.eventId;
    if(this.entryId) {
      fg.id = this.entryId;
    }

    this.entryApiService.postEntry(fg).subscribe(x => console.log(x));
  }
}


