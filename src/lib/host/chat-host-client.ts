import {Wmp} from "../shared/names";
import {Subject} from "rxjs";
import {ChatUserProcedures} from "../user/chat-user-client";
import {Wampus} from "wampus";
import {HelloDetails} from "wampus/protocol";

export interface HostBindings {
	sendMessage(msg : Wmp.Host.SendMessage.Args): Promise<void>;

	userConnected: Subject<Wmp.Host.UserConnected.Event>;

	userDisconnected: Subject<Wmp.Host.UserDisconnected.Event>;

	userDetails(msg: Wmp.Host.UserDetails.Args): Promise<Wmp.Host.UserDetails.Result>

	userList(msg: Wmp.Host.UserList.Args): Promise<Wmp.Host.UserList.Res>;

	logIn(msg: Wmp.Host.LogIn.Args): Promise<Wmp.Host.LogIn.Result>;

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
				dits.authrole = "host";
			}
		});

		let x = session.procedures({
			async [Wmp.Host.UserDetails.name](x) {
				return {
					kwargs: await bindings.userDetails(x.kwargs)
				}
			},
			async [Wmp.Host.UserList.name](x) {
				return {
					kwargs: {
						users: await bindings.userList(x.kwargs)
					}
				};
			},
			async [Wmp.Host.SendMessage.name](x) {
				await bindings.sendMessage(x.kwargs);
				return {};
			},
			async [Wmp.Host.LogIn.name](x) {
				return {
					kwargs: await bindings.logIn(x.kwargs)
				}
			}
		});


	}

}