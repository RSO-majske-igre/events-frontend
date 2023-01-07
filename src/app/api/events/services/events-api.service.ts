import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PageDto} from "../model/page.model";
import {EventDto} from "../model/eventDto";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EventsApiService {

  private baseUrl = `${environment.eventsBaseUrl}/events`;

  constructor(private http: HttpClient) {}

  public getEvents(page: number, perPage: number): Observable<PageDto<EventDto>> {
    return this.http.get<PageDto<EventDto>>(`${this.baseUrl}?page=${page}&perPage=${perPage}`);
  }


}
