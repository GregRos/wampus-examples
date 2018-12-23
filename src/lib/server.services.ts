import {WampusSession} from "wampus";
import {Message} from "./shared";

export type KwargsOf<T> = {
	kwargs : T;
}

export class ServerServices {

	async create(session : WampusSession) {
		let prefix = str => `server.${str}`;

		session.procedures({
			async [prefix("messages.push")]({kwargs}) {
				return {}
			},
			async [prefix("users.last_seen")]({kwargs}) {
				return {};
			},
			async [prefix("users.search")]({kwargs}) {
				return {}
			}
		})
	}
}