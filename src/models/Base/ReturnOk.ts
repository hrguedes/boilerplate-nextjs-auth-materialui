import { NotificationResponse } from "../Notifications/NotificationResponse";

class ReturnOk<T> {
    public statusCode: number;
    public messages: NotificationResponse[];
    public ok: boolean;
    public response: T | null;

    constructor(statusCode: number, messages: NotificationResponse[], ok: boolean, data: T  | null) {
        this.statusCode = statusCode;
        this.messages = messages;
        this.ok = ok;
        this.response = data;
    }
}

export default ReturnOk;