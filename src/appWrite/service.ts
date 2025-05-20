import {
    Client,
    ID,
    Databases,
    Storage,
    Query,
} from 'appwrite';
import { config } from '../config/config';

export interface PostData {
    title: string;
    slug: string;
    content: string;
    featuredImage?: string;
    status: string;
    userId: string;
}

export interface UpdatePostData {
    title: string;
    content: string;
    featuredImage?: string;
    status: string;
}

class Service {
    private client: Client;
    private databases: Databases;
    private bucket: Storage;

    constructor() {
        this.client = new Client()
            .setEndpoint(config.appwriteUrl)
            .setProject(config.ProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost(data: PostData) {
        try {
            return await this.databases.createDocument(
                config.DatabaseId,
                config.CollectionId,
                data.slug,
                {
                    title: data.title,
                    content: data.content,
                    featuredImage: data.featuredImage,
                    status: data.status,
                    userId: data.userId,
                }
            );
        } catch (error) {
            console.error('Appwrite service :: createPost :: error', error);
        }
    }

    async updatePost(
        slug: string,
        data: UpdatePostData
    ) {
        try {
            return await this.databases.updateDocument(
                config.DatabaseId,
                config.CollectionId,
                slug,
                data
            );
        } catch (error) {
            console.error('Appwrite service :: updatePost :: error', error);
        }
    }

    async deletePost(slug: string): Promise<boolean> {
        try {
            await this.databases.deleteDocument(
                config.DatabaseId,
                config.CollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.error('Appwrite service :: deletePost :: error', error);
            return false;
        }
    }

    async getPost(slug: string) {
        try {
            return await this.databases.getDocument(
                config.DatabaseId,
                config.CollectionId,
                slug
            );
        } catch (error) {
            console.error('Appwrite service :: getPost :: error', error);
            return false;
        }
    }

    async getPosts(
        queries: string[] = [Query.equal('status', 'active')]
    ) {
        try {
            return await this.databases.listDocuments(
                config.DatabaseId,
                config.CollectionId,
                queries
            );
        } catch (error) {
            console.error('Appwrite service :: getPosts :: error', error);
            return false;
        }
    }

    async uploadFile(file: File) {
        try {
            return await this.bucket.createFile(
                config.BucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error('Appwrite service :: uploadFile :: error', error);
            return false;
        }
    }

    async deleteFile(fileId: string) {
        try {
            await this.bucket.deleteFile(config.BucketId, fileId);
            return true;
        } catch (error) {
            console.error('Appwrite service :: deleteFile :: error', error);
            return false;
        }
    }

    getFilePreview(fileId: string) {
        const imageUrl = this.bucket.getFilePreview(config.BucketId, fileId);
        console.log(imageUrl)
        return imageUrl
    }
}

const service = new Service();
export default service;
