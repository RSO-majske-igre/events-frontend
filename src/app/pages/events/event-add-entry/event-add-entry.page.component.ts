import {Component, OnInit} from "@angular/core";
import {EventsApiService} from "../../../api/events/services/events-api.service";
import {ParticipantsApiService} from "../../../api/participants/services/participants-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ComponentState} from "../../../types/component-state.type";
import {ParticipantDto} from "../../../api/participants";
import {EntryDto} from "../../../api/events";
import {EntryApiService} from "../../../api/events/services/entry-api.service";

@Component({
  selector: 'app-event-add-entry',
  templateUrl: 'event-add-entry.page.component.html'
})
export class EventAddEntryPageComponent implements OnInit {

  public participants?: ParticipantDto[];
  private eventId!: string;
  private entryId?: string;
  private componentState: ComponentState = 'default';
  private entry?: EntryDto;

  constructor(
    private eventApiService: EventsApiService,
    private participantApiService: ParticipantsApiService,
    private entryApiService: EntryApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
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
    this.participantApiService.getParticipants(page, perPage).subscribe({
      next: participants => {
        this.participants = participants.content;
      },
      error: () => this.componentState = 'error'
    })
  }

  public getEntry(entryId: string): void {
    this.entryApiService.getEntryById(entryId).subscribe({
      next: entry => {
        this.entry = entry;
        this.participants = Array.from(entry.participants?.values() ?? new Set());
        console.log(entry);
      }
    })
  }
}
