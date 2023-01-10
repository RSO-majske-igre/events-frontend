import {Component, Input} from "@angular/core";
import {ParticipantDto} from "../../../api/participants";
import {EntryDto} from "../../../api/events";


@Component({
  selector: 'app-events-participants',
  templateUrl: 'participants-event.component.html'
})
export class ParticipantsEventComponent {
  @Input() public entry!: EntryDto;
  @Input() public eventId!: string;
}
