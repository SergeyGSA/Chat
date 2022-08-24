import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {HttpClientModule} from '@angular/common/http'
import {ReactiveFormsModule} from '@angular/forms'

import {ChatPageComponent} from 'src/app/chat/components/chat-page/chat-page.component'
import {SearchComponent} from 'src/app/chat/components/search/search.component'
import {ContactComponent} from './components/contact/contact.component'
import {MessageComponent} from './components/message/message.component'
import {MessageInputComponent} from './components/message-input/message-input.component'

@NgModule({
  declarations: [
    ChatPageComponent,
    SearchComponent,
    ContactComponent,
    MessageComponent,
    MessageInputComponent,
  ],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
})
export class ChatModule {}
