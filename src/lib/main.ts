// Let's define a convention like this:

import {WampusSession} from "wampus";

function prefix(n) {
	return `client.${n}`;
}

export class WampusUsing {
	session : WampusSession;
	clientId : number;
	private _prefix(str) {
		return `client.${this.clientId}.${str}`
	}

	private _pr2(str) {
		return `server.${this.clientId}.${str}`;
	}
	async s() {

		this.session.procedures({
			async [this._prefix("messages.push")]({kwargs : {message, sender}}) {
				return {}
			},

		});

		this.session.procedures({
			async [this._pr2("user_info.update")]({kwargs : {}}) {
				return {};
			}
		})
	}
}