import conf from '../conf/conf.js'; // Configuration file se settings import karna
import { Client, Account, ID } from "appwrite"; // Appwrite SDK se necessary classes import karna

// AuthService class define kiya jo authentication operations handle karega
export class AuthService {
    client = new Client(); // Appwrite client instance create karna
    account; // Account instance

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Appwrite endpoint set karna
            .setProject(conf.appwriteProjectId); // Appwrite project ID set karna
        this.account = new Account(this.client); // Account instance initialize karna
            
    }

    // Method to create a new user account
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            // Agar user account create ho gaya, to login method call karo
            if (userAccount) {
                return this.login({email, password});
            } else {
               return userAccount; // Agar account create nahi hua to wahi return karo
            }
        } catch (error) {
            throw error; // Error ko throw karo agar koi issue aata hai
        }
    }

    // Method to login user
    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password); // Email aur password se session create karo
        } catch (error) {
            throw error; // Error ko throw karo agar koi issue aata hai
        }
    }

    // Method to get the currently logged-in user
    async getCurrentUser() {
        try {
            return await this.account.get(); // Current user details fetch karo
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error); // Error ko log karo agar koi issue aata hai
        }

        return null; // Agar koi error aata hai to null return karo
    }

    // Method to logout the user
    async logout() {
        try {
            await this.account.deleteSessions(); // User sessions delete karo
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error); // Error ko log karo agar koi issue aata hai
        }
    }
}

// AuthService ka instance create karo
const authService = new AuthService();

export default authService; // Default export karo taaki ye service dusre modules me use ho sake
