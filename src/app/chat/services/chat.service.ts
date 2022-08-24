import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {map, Observable} from 'rxjs'
import {environment} from 'src/environments/environment'
import {IChat, IMessage} from '../types/chat.interface'

interface IJoke {
  categories: unknown[]
  created_at: string
  icon_url: string
  id: string
  updated_at: string
  url: string
  value: string
}
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  }

  constructor(private http: HttpClient) {}

  public getChats(): Observable<IChat[]> {
    return this.http.get<IChat[]>(`${environment.API_URL}chats`).pipe(
      // Sort chats by last message's date
      map((chats: IChat[]) => {
        return chats.sort((a: IChat, b: IChat) => {
          return (
            b.history[b.history.length - 1].date -
            a.history[a.history.length - 1].date
          )
        })
      })
    )
  }

  public getChatById(id: string): Observable<IChat> {
    return this.http.get<IChat>(`${environment.API_URL}chats/${id}`)
  }

  public sendMessage(chat: IChat) {
    return this.http.patch<IChat>(
      `${environment.API_URL}chats/${chat.id}`,
      chat,
      this.httpOptions
    )
  }

  // Generates a random joke from https://api.chucknorris.io
  public getChuckNorrisJoke(): Observable<IMessage> {
    return this.http.get<IJoke>(`https://api.chucknorris.io/jokes/random`).pipe(
      map((joke: IJoke) => {
        const chuckNorrisJoke: IMessage = {
          text: joke.value,
          date: Date.now(),
          direction: 'to',
        }
        return chuckNorrisJoke
      })
    )
  }
}
