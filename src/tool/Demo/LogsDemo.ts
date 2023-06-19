import moment from "moment";
import logsExample from "@/tool/Demo/logsExample";
import {AwsPureLogWithIdInterface} from "@/type/AwsLogTypes";

const DEFAULT_LIMIT = 100;

const generateRandomLogs = (limit: number): AwsPureLogWithIdInterface[] => {
  const result: AwsPureLogWithIdInterface[] = [];
  while (result.length < (limit - 1)) {
    const arrayIndex = Math.floor(Math.random() * logsExample.length);
    result.push({
      ...logsExample[arrayIndex],
      id: result.length + 1,
    })
  }
  return result;
}

const LogsDemo = {
  generateForDateTime: (dateTime: string, limit = DEFAULT_LIMIT): AwsPureLogWithIdInterface[] => {
    let tsMks = moment(dateTime).valueOf() / 1000;
    return generateRandomLogs(limit).map((logRecord) => {
      tsMks += Math.random();
      return {
        ...logRecord,
        timestamp: tsMks,
      };
    });
  },
  generateBeforeLogId: (
    logId: number,
    logTimestamp: number,
    limit = DEFAULT_LIMIT
  ): AwsPureLogWithIdInterface[] => {
    let currentTimestamp = logTimestamp;

    return generateRandomLogs(limit).map((logRecord, key) => {
      currentTimestamp -= Math.random();
      return {
        ...logRecord,
        id: logId - key - 1,
        timestamp: currentTimestamp,
      };
    }).reverse();
  },
  generateAfterLogId: (
    logId: number,
    logTimestamp: number,
    limit = DEFAULT_LIMIT
  ): AwsPureLogWithIdInterface[] => {
    let currentTimestamp = logTimestamp;

    return generateRandomLogs(limit).map((logRecord, key) => {
      currentTimestamp += Math.random();
      return {
        ...logRecord,
        id: logId + key + 1,
        timestamp: currentTimestamp,
      };
    });
  },
};

export default LogsDemo;
