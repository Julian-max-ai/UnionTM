import type Message from "./Message";
import type User from "./User";
import type * as Types from "../types/namespaced";
import type Client from "../Client";
import type { PollLayoutType } from "../Constants";
export default class Poll {
    allowMultiselect: boolean;
    answers: Array<Types.Channels.PollAnswer>;
    client: Client;
    expiry: Date;
    layoutType: PollLayoutType;
    message: Message;
    question: Types.Channels.PollQuestion;
    results: Types.Channels.PollResults;
    constructor(data: Types.Channels.RawPoll, client: Client, message: Message);
    /** The user that created this poll. */
    get creator(): User;
    /** End this poll now. */
    expire(): Promise<void>;
    /**
     * Get the users that voted on a poll answer.
     * @param answerID The ID of the poll answer to get voters for.
     * @param options The options for getting the voters.
     */
    getAnswerUsers(answerID: number, options?: Types.Channels.GetPollAnswerUsersOptions): Promise<Array<User>>;
    toJSON(): Types.JSON.JSONPoll;
}
