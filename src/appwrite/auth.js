import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";


export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }

    async createAccount({email,password,name,mobno}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name,mobno)
            if (userAccount){
                console.log('userAccount : ',userAccount)
                return await this.login({email,password})
            }
            else{
                return userAccount
            }
        } catch (error) {
            console.log('appwrite :: Sign up() :: ',error)
        }
    }

    async getCurrentUser(){
        try {
            const user = await this.account.get()
            console.log(user)
            return user
        } catch (error) {
            console.log('User is not Available. ')
        }
        return null
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            console.log('appwrite :: login() :: ',error)
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log('appwrite :: logout() :: ', error)
        }
    }
    

}

const authService = new AuthService()

export default authService









