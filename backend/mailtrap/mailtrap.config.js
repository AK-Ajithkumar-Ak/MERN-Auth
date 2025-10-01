import { config } from 'dotenv';
import {MailtrapClient} from 'mailtrap';

config()// dot env config because of the file name is .config and show the value process.env.MAILTRAP_TOKEN
export const mailtrapClient= new MailtrapClient({
    // endpoint: process.env.MAILTRAP_ENDPOINT,
	token: process.env.MAILTRAP_TOKEN,
},
// console.log(process.env.MAILTRAP_TOKEN, "line 9")

)

export const sender= {
    email: "hello@demomailtrap.co",
    name:"ajith kumar mailtrap"
}
