import {Component, OnInit} from '@angular/core'
import {Observable} from 'rxjs'
import {ChatService} from '../../services/chat.service'
import {IChat} from '../../types/chat.interface'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  protected chats$: Observable<IChat[]>

  constructor(private readonly chatService: ChatService) {
    this.chats$ = this.chatService.getChats()
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}
}
