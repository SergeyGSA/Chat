import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'
import {IMessage} from '../../types/chat.interface'

interface IMessageForm {
  message: FormControl<string>
}
@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageInputComponent {
  protected messageForm: FormGroup<IMessageForm>

  @Output()
  public newMessageEvent = new EventEmitter<IMessage>()

  constructor() {
    this.messageForm = new FormGroup<IMessageForm>({
      message: new FormControl('', {nonNullable: true}),
    })
  }

  protected sendMessage(): void {
    const message: IMessage = {
      text: this.messageForm.value.message,
      date: Date.now(),
      direction: 'from',
    }

    this.newMessageEvent.emit(message)

    this.messageForm.reset()
  }
}
