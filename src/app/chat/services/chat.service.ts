import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {environment} from 'src/environments/environment'
import {IChat} from '../types/chat.interface'

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private readonly http: HttpClient) {}

  getChats(): Observable<IChat[]> {
    return this.http.get<IChat[]>(`${environment.API_URL}chats`)
  }
}
