import {WampApi} from "../shared/names";
import {Wampus, WampusSession} from "wampus";
import SendMessage = WampApi.Host.SendMessage;
import {WampusCallArguments} from "wampus/core";
import {Observable} from "rxjs";
import {Ticket} from "wampus/tickets";
import Client = WampApi.Client;
import {HelloDetails} from "wampus/protocol";

type TypedMessage<T> = WampusCallArguments & T;

export interface ClientOperations {
	pushMessage(message : Mess)
}

export class HostConnector {
	private _session : WampusSession;
	private _tickets : Ticket
	constructor(never : never) {

	}

	static async create(url : string) {
		let id = ((Math.random() * 100000) | 0).toString(36);
		let session = await Wampus.connect({
			transport : {
				type : "websocket",
				url : url,
				serializer : "json"
			},
			realm : "chat",
			helloDetails(dits : HelloDetails): void {
				dits.authrole = "client." + id;
			}
		});
		let connector = new HostConnector(null as never);

		session.procedure({
			name,

		})
		session.procedure({
			name : ""
		})
		let connected = connector._tickets = await session.topic({
			name : WampApi.Host.UserConnected
		});
		connector.userConnected = connected.events;

		let disconnected = await session.topic({
			name : WampApi.Host.UserDisconnected
		});
		connector.userDisconnected = disconnected.events;

		let push = await session.register({
			name : WampApi.Client.PushMessage(id),
			called : x => connector.onPushedMessage(x)

		})
	}

	async close() {

	}

	sendMessage(msg : {text : string, senderId : string}) {
		return this._session.call({
			name: WampApi.Host.SendMessage,
			kwargs : {
				...msg
			}
		});
	}

	userList() {
		return this._session.call({
			name : WampApi.Host.UserList,
		});
	}

	userDetails(userId : string) {
		return this._session.call({
			name : WampApi.Host.UserDetails,
			kwargs : {
				userId
			}
		})
	}

	onPushedMessage : (msg : WampApi.Client.PushMessage) => Promise<void>;

	userConnected : Observable<WampApi.Host.UserConnected>;

	userDisconnected : Observable<WampApi.Host.UserDisconnected>;
}