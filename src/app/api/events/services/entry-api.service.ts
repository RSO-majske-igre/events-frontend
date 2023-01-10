import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EntryDto} from "../model/entryDto";
import {ParticipantDto} from "../../participants";

@Injectable({
  providedIn: 'root'
})
export class EntryApiService {
  private baseUrl = `${environment.eventsBaseUrl}/events/entries`;

  constructor(private http: HttpClient) {
  }

  public getEntryById(id: string): Observable<EntryDto> {
    return this.http.get<EntryDto>(`${this.baseUrl}/${id}`);
  }

  public postEntry(entry: any): Observable<EntryDto> {
    entry.participants = Array.from<ParticipantDto>((entry as EntryDto).participants ?? []);
    return this.http.post<EntryDto>(this.baseUrl, entry);
  }
}
