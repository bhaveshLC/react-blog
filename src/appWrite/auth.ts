import { config } from "../config/config";

import { Client, Account, ID } from "appwrite";

export class AuthService {
    private client: Client;
    private account: Account;

    constructor() {
        this.client = new Client()
            .setEndpoint(config.appwriteUrl)
            .setProject(config.ProjectId);
        this.account = new Account(this.client);
    }

    async createAccount(email: string, password: string, name: string) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login(email, password)
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
    async login(email: string, password: string) {
        try {
            await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
    }
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}
const authService = new AuthService()
export default authService
