import moment from "moment";
import {ClientStatsInterface} from "@/type/ClientStatsInterface";

export const generateClientStatsDemo = (
  lengthSeconds: number,
  anomalyProbability = .10
): ClientStatsInterface => {
  const nowTs = + new Date();

  const result: ClientStatsInterface = {
    statList: [],
    anomalyList: [],
  };

  let stepTs = nowTs - (lengthSeconds * 1000);

  // Generating Client Stats
  while (stepTs < nowTs) {
    stepTs += Math.round((20 * Math.random() + 50) * 1000);
    const utcIsoString = moment(stepTs).toISOString();

    const ram = 1400 + Math.round(Math.random() * 50);
    result.statList.push({
      cpu: 50 + Math.round(Math.random() * 15),
      ram,
      freeRam: 16000 - ram,
      networkIo: Math.round(Math.random() * 50),
      diskSpace: 12.3,
      diskIo: Math.round(Math.random() * 10),

      dateTime: utcIsoString,
    });
  }

  // Generating Anomalies
  stepTs = nowTs - (lengthSeconds * 1000);
  while (stepTs < nowTs) {
    stepTs += Math.round(Math.random() * 1000);

    if (Math.random() > (1 - anomalyProbability)) {
      result.anomalyList.push({
        timestampMkS: stepTs * 1000,
      })
    }
  }

  return result;
};
