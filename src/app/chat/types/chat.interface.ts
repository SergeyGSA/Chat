export interface IChat {
  id: number
  name: string
  photo: string
  history: IMessage[]
}

export interface IMessage {
  text: string
  date: number
  direction: string
}
