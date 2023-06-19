import {AwsPureLogWithIdInterface} from "@/type/AwsLogTypes";

export default interface LogsSliceInterface {
  clientId: number|null,
  dateTime: string|null,
  logs: AwsPureLogWithIdInterface[]|null,
  isLoading: boolean,
}
