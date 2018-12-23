export interface UserInfo {
	id: number;
	name: string;
	age: number;
}










export module Wmp {
	export module Host {
		export module SendMessage {
			export const name = "messages.send";

			export interface Args {
				senderId: string;
				text: string;
			}

			export interface Res {}
		}

		export module UserList {
			export const name = "users.list";

			export interface Args {}

			export type Res = UserInfo[];
		}

		export module UserDetails {
			export const name = "users.details";

			export interface Args {
				userId: string;
			}

			export interface Result {
				name: string;
			}
		}

		export module UserConnected {
			export const name = "users.connected";

			export interface Event {
				date: Date;
				userId: string;
			}
		}

		export module UserDisconnected {
			export const name = "users.disconnected";

			export interface Event {
				date: Date;
				userId: string;
			}
		}

		export module LogIn {
			export const name = "sys.login";

			export interface Args {
				user: string;
				pass: string;
			}

			export interface Result {

			}
		}
	}

	export module Client {

		export module PushMessage {
			export const name = clientId => `client.${clientId}.messages.push`;

			export interface Req {
				kwargs: {
					date: Date;
					text: string;
					senderId: string;
				}
			}
		}
	}
}
