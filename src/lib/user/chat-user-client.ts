import {Wmp} from "../shared/names";
import {Wampus, WampusSession} from "wampus";
import {WampusCallArguments} from "wampus/core";
import {Observable} from "rxjs";
import {Ticket} from "wampus/tickets";
import Client = Wmp.Client;
import {HelloDetails} from "wampus/protocol";
import {map} from "rxjs/operators";

type TypedMessage<T> = WampusCallArguments & T;


export interface ChatUserProcedures {
	pushMessage(x: Wmp.Client.PushMessage.Req): Promise<void>;
}

export class ChatUserClient {
	private _session : WampusSession;
	private _tickets : Ticket;

	constructor(never : never) {

	}

	static async create(url : string, bindings: ChatUserProcedures) {
		let id = ((Math.random() * 100000) | 0).toString(36);
		let session = await Wampus.connect({
			transport : {
				type : "websocket",
				url : url,
				serializer : "json"
			},
			realm : "chat",
			handshake(dits : HelloDetails): void {
				dits.authrole = "client." + id;
			}
		});

		let connector = new ChatUserClient(null as never);
		let topics = await session.topics([Wmp.Host.UserConnected.name, Wmp.Host.UserDisconnected.name]);

		connector.userConnected = topics.topic[Wmp.Host.UserConnected.name].pipe(map(x => x.kwargs));
		connector.userDisconnected = topics.topic[Wmp.Host.UserDisconnected.name].pipe(map(x => x.kwargs));

		let push = await session.procedure({
			name : Wmp.Client.PushMessage.name(id),
			called : async x => {
				await bindings.pushMessage(x);
				return {};
			}
		});
	}

	async close() {

	}

	sendMessage(msg : Wmp.Host.SendMessage.Args) {
		return this._session.call({
			name: Wmp.Host.SendMessage.name,
			kwargs : msg
		});
	}

	userList() {
		return this._session.call({
			name : Wmp.Host.UserList.name
		}).result.then(x => x.kwargs.users) as Promise<Wmp.Host.UserList.Res>;
	}

	logIn(msg: Wmp.Host.LogIn.Args) {
		return this._session.call({
			name: Wmp.Host.LogIn.name,
			kwargs: msg
		}).result.then(x => x.kwargs) as Promise<Wmp.Host.LogIn.Result>;
	}

	userDetails(userId : string) {
		return this._session.call({
			name : Wmp.Host.UserDetails.name,
			kwargs : {
				userId
			}
		}).result.then(x => x.kwargs) as Promise<Wmp.Host.UserList.Res>;
	}

	userConnected : Observable<Wmp.Host.UserConnected.Event>;

	userDisconnected : Observable<Wmp.Host.UserDisconnected.Event>;
}