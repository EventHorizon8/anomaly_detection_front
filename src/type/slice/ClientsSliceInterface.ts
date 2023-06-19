import ClientInterface from "@/type/ClientInterface";
import {ClientStatsInterface} from "@/type/ClientStatsInterface";

export default interface ClientsSliceInterface {
  clientList: ClientInterface[]|null,
  clientStats: {[clientId: number]: ClientStatsInterface}
}
