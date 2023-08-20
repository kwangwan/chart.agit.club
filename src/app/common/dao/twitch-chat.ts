export interface ITwitchChatInput{
  chartId?: string,
  channelName?: string,
  dateTimeStart?: string,
  dateTimeEnd?: string,
  timeZone?: string,
  fixedInterval?: string,
  shouldMatchPhrase?: string[],
  mustMatchPhrase?: string[],
  mustNotMatchPhrase?: string[]
}

export interface ITwitchChatBuzzOutput {
  chartId?: string,
  value?: {[dateTime:string]: number}
}

export interface ITwitchChatMessageOutput {
  createdAt?: string,
  chat?: string
}
