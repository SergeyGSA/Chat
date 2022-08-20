import {Component, Input, OnInit} from '@angular/core'
import {Observable} from 'rxjs'
import {IChat} from '../../types/chat.interface'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input()
  public chat$?: Observable<IChat>

  constructor() {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}
}
