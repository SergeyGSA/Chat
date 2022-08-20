import {Component, Input, OnInit} from '@angular/core'
import {Observable} from 'rxjs'
import {IChat} from '../../types/chat.interface'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  protected chat!: IChat

  @Input()
  public chats$?: Observable<IChat[]>

  constructor() {}

  ngOnInit(): void {
    this.chats$?.subscribe((data) => {
      this.chat = data.filter((val) => val.name === 'Eric Cartman')[0]
    })
  }
}
