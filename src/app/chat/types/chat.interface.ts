export interface IChat {
  id: string
  name: string
  photo: string
  history: IMessage[]
}

export interface IMessage {
  text: string | undefined
  date: number
  direction: string
}
