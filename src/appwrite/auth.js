import conf from "../conf/conf"
import { Client, Account, ID } from "appwrite";


//Quality Code
export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try {
           const userAccount =  await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.login({email, password})

            } else {
                return userAccount    
            }
            
        } catch (error) {
            console.log("Create Account: ", error);
            
        }
    }

    async login({email, password}){
        try {
           return await this.account
                        .createEmailPasswordSession(email,password);

        } catch (error) {
            console.log("user login failed: ",error);
            
        }
    }

    async getCurrentUser(){
        try {
           return await  this.account.get()
        } catch (error) {
            console.log("getcurrentUser in auth.js failed: ",error);     
        }

        return null
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Logout failed:",error);
            
        }
    }
}

const service = new AuthService()

export default service
