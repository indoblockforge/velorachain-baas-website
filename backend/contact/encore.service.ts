import { Service } from "encore.dev/service";

export default new Service("contact");

export { submitContact } from "./submit";
export { subscribe } from "./subscribe";