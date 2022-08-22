import {Component, OnInit} from '@angular/core'
import {Observable} from 'rxjs'
import {ChatService} from '../../services/chat.service'
import {IChat, IMessage} from '../../types/chat.interface'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  protected chats$: Observable<IChat[]>
  protected chat$!: Observable<IChat>
  protected searchedContact: string = ''

  constructor(private readonly chatService: ChatService) {
    this.chats$ = this.chatService.getChats()
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

  protected getChatById(id: string) {
    this.chat$ = this.chatService.getChatById(id)
  }
  // TODO:
  protected sendMessage(message: IMessage): void {
    // this.chat$.subscribe((chat: IChat) => {
    //   const updatedChat: IChat = {
    //     id: chat.id,
    //     name: chat.name,
    //     photo: chat.photo,
    //     history: [...chat.history, message],
    //   }
    //   // console.log(updatedChat)
    //   this.chatService
    //     .sendMessage(updatedChat)
    //     .subscribe((data) => console.log(data))
    // })
  }

  protected searchContact(searchValue: string) {
    this.searchedContact = searchValue
  }

  // private generateChuckNorrisJoke(): void {
  //   this.chatService.getChuckNorrisJoke().subscribe((data) => console.log(data))
  // }
}
