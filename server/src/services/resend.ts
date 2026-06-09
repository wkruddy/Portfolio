import { Resend } from "resend";
import { env } from "../utils/env.js";

export const resend = new Resend(env.resendApiKey);
