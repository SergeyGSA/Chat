import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {map, Observable, of} from 'rxjs'
import {IChat, IMessage} from '../types/chat.interface'
import * as mockChats from '../../../DB/db'

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
  constructor(private http: HttpClient) {
    if (!this.isLocalStorageHaveChats()) {
      this.setDataToLocalStorage(mockChats.chats) // Set mock chats in local storage
    }
  }

  public getChats(): Observable<IChat[]> {
    return this.getDataFromLocalStorage().pipe(
      // Sort chats by last message's date
      map((chats: IChat[]) => {
        return chats?.sort((a: IChat, b: IChat) => {
          return (
            b.history[b.history.length - 1]?.date -
            a.history[a.history.length - 1]?.date
          )
        })
      })
    )
  }

  public getChatById(id: string): Observable<IChat> {
    return this.getDataFromLocalStorage().pipe(
      map((chats: IChat[]) => {
        return chats.filter((chat: IChat) => chat.id === id)[0]
      })
    )
  }

  public sendMessage(chat: IChat): Observable<IChat> {
    return this.getDataFromLocalStorage().pipe(
      map((chats: IChat[]) => {
        // Find chat that we need to update
        const currentChat = chats.filter(
          (chatFromServer: IChat) => chatFromServer.id === chat.id
        )[0]

        currentChat.history.push(chat.history[chat.history.length - 1]) // Add new message to chat instance

        const currentChatIndex = chats.indexOf(currentChat)
        chats.splice(currentChatIndex, 1, currentChat) // Update chats array, replace chat with the chat instance
        this.setDataToLocalStorage(chats)

        return currentChat
      })
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

  private setDataToLocalStorage(chats: IChat[]): void {
    const data = JSON.stringify(chats)
    window.localStorage.setItem('chats', data)
  }

  private getDataFromLocalStorage(): Observable<IChat[]> {
    const data = window.localStorage.getItem('chats')
    let chats
    if (data) {
      chats = JSON.parse(data)
    }

    return of(chats)
  }

  private isLocalStorageHaveChats(): boolean {
    return !!window.localStorage.getItem('chats')
  }
}
