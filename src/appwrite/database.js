import { Client, Databases, ID } from "appwrite";
import conf from "../conf/conf";

export class DatabaseService {
    client;
    databases;

    constructor(){
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
    }

    async getAllDocuments(collectionId,query){
        try {
            const documents = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                collectionId,
                query
            )
            return documents
        } catch (error) {
            console.log('appwrite :: getAllDocuments() :: ',error)
        }
    }

    async getInfo(collectionId,documentId){
        try {
            const document = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                collectionId,
                documentId
            )
            return document
        } catch (error) {
            console.log('getInfo :: ',document)
        }
    }

    async addInfo(collectionId,data){
        try {
            const document = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                collectionId,
                ID.unique(),
                data
            )
           return document
        } catch (error) {
            console.log('appwrite :: addInfo() :: ',error)
        }

    }

    async updateInfo(collectionId,documentId,data){
        try {
            await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                collectionId,
                documentId,
                data
            )
            console.log('record updated')
        } catch (error) {
            console.log('appwrite :: updateInfo :: ',error)
        }
    }

    async deleteInfo(collectionId,documentId){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                collectionId,
                documentId
            )
            console.log('Document deleted')
        } catch (error) {
            console.log('appwrite :: deleteInfo :: ',error)
        }
    }

}


const databaseService = new DatabaseService()

export default databaseService




// databases.createDocument(
//     '<DATABASE_ID>', // databaseId
//     '<COLLECTION_ID>', // collectionId
//     '<DOCUMENT_ID>', // documentId
//     {}, // data
//     ["read("any")"] // permissions (optional)
// );

