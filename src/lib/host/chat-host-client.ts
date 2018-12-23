import {Wmp} from "../shared/names";
import {Subject} from "rxjs";
import {ChatUserProcedures} from "../user/chat-user-client";
import {Wampus} from "wampus";
import {HelloDetails} from "wampus/protocol";

export interface HostBindings {
	sendMessage(msg : Wmp.Host.SendMessage.Req): Promise<void>;

	userConnected: Subject<Wmp.Host.UserConnected.Event>;

	userDisconnected: Subject<Wmp.Host.UserDisconnected.Event>;

	userDetails(msg: Wmp.Host.UserDetails.Req): Promise<Wmp.Host.UserDetails.Res>

	userList(msg: Wmp.Host.UserList.Req): Promise<Wmp.Host.UserList.Res>;

	logIn(msg: Wmp.Host.LogIn.Req): Promise<Wmp.Host.LogIn.Res>;

}

export class ChatHostClient {

	static async create(url : string, bindings: HostBindings) {
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

		let x = session.procedures({
			async [Wmp.Host.UserDetails.name](x) {
				return bindings.userDetails(x);
			},
			async [Wmp.Host.UserList.name](x) {
				return bindings.userList(x);
			},
			async [Wmp.Host.SendMessage.name](x) {
				await bindings.sendMessage(x);
				return {};
			},
			async [Wmp.Host.LogIn.name](x) {
				return bindings.logIn(x);
			}
		});


	}

}