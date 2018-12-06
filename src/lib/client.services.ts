import {WampusSession} from "wampus";

export class ClientServices {
	static async create(session : WampusSession) {
		let id = ((Math.random() * 100000) | 0).toString(36);
		let prefix = str => `client.${id}.${str}`;
		session.registerAll({
			async [prefix("messages.push")]({kwargs : {title, text, sender, context}}) {
				return {};
			}
		});
	}
}