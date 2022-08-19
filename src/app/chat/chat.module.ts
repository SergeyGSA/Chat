import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {HttpClientModule} from '@angular/common/http'
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api'
import {InMemoryDataService} from './services/in-memory-data.service'

import {ChatComponent} from 'src/app/chat/components/chat/chat.component'
import {SearchComponent} from 'src/app/chat/components/search/search.component'
import {ContactComponent} from './components/contact/contact.component'
import {MessageComponent} from './components/message/message.component'
import {MessageInputComponent} from './components/message-input/message-input.component'

@NgModule({
  declarations: [
    ChatComponent,
    SearchComponent,
    ContactComponent,
    MessageComponent,
    MessageInputComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
})
export class ChatModule {}
