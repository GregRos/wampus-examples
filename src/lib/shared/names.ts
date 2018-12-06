export module WampApi {
	export module Host {
		export interface SendMessage {
			kwargs: {
				senderId: string;
				text: string;
			}
		}

		export const SendMessage: "host.messages.send" = "host.messages.send";


		export interface UserList {

		}

		export const UserList: "host.users.list" = "host.users.list";

		export interface UserDetails {
			kwargs: {
				userId: string;
			}
		}

		export const UserDetails: "host.users.details" = "host.users.details";

		export interface UserConnected {
			kwargs: {
				date: Date;
				userId: string;
			}
		}

		export const UserConnected: "host.users.connected" = "host.users.connected";

		export interface UserDisconnected {
			kwargs: {
				date: Date;
				userId: string;
			}
		}

		export const UserDisconnected = "shared.users.disconnected";

		export interface LogIn {
			kwargs : {

			}
		}
	}

	export module Client {

		export function PushMessage(clientId : string) {
			return `client.${clientId}.messages.push`;
		}
		export interface PushMessage {
			kwargs: {
				date: Date;
				text: string;
				senderId: string;
			}
		}
	}
}
