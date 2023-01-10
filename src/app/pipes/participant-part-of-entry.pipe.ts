import {Pipe, PipeTransform} from "@angular/core";
import {SelectableParticipant} from "../models";

@Pipe({
  name: 'participantPartOfEntryPipe',
  pure: false
})
export class ParticipantPartOfEntryPipe implements PipeTransform {
  transform(participants: SelectableParticipant[], partOrNoPart: boolean): SelectableParticipant[] {
    return participants.filter(p => p.selected === partOrNoPart) ?? [];
  }
}
