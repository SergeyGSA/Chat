import {Component, Input, OnInit} from '@angular/core'
import {IChat, IMessage} from '../../types/chat.interface'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input()
  public message!: IMessage

  @Input()
  public chat!: IChat

  constructor() {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}
}
