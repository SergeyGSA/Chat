import {ChangeDetectionStrategy, Component, Input} from '@angular/core'
import {IChat, IMessage} from '../../types/chat.interface'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  @Input()
  public message!: IMessage

  @Input()
  public chat!: IChat

  constructor() {}
}
