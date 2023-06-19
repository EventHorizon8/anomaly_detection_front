
export interface AwsPureLogInterface {
  timestamp: number,
  processId: number,
  threadId: number,
  parentProcessId: number,
  userId: number,
  mountNamespace: number,
  processName: string,
  hostName: string,
  eventId: number,
  eventName: string,
  stackAddresses: number[],
  argsNum: number,
  returnValue: number,
  args: string,
  sus: number,
  evil: number,
  isAnomaly: boolean,
}

export interface AwsPureLogWithIdInterface extends AwsPureLogInterface {
  id: number;
}
