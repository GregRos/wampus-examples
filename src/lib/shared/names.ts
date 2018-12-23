export interface UserInfo {
	id: number;
	name: string;
	age: number;
}
export module Wmp {
	export module Host {
		export module SendMessage {
			export const name = "messages.send";

			export interface Req {
				kwargs: {
					senderId: string;
					text: string;
				}
			}

			export interface Res {}
		}

		export module UserList {
			export const name = "users.list";

			export interface Req {}

			export type Res = {
				args: UserInfo[]
			}
		}

		export module UserDetails {
			export const name = "users.details";

			export interface Req {
				kwargs: {
					userId: string;
				}
			}

			export interface Res {
				kwargs: {
					name: string;
				}
			}
		}

		export module UserConnected {
			export const name = "users.connected";

			export interface Event {
				kwargs: {
					date: Date;
					userId: string;
				}
			}
		}

		export module UserDisconnected {
			export const name = "users.disconnected";

			export interface Event {
				kwargs: {
					date: Date;
					userId: string;
				}
			}
		}

		export module LogIn {
			export const name = "sys.login";

			export interface Req {
				kwargs: {
					user: string;
					pass: string;
				}
			}

			export interface Res {

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
