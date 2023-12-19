 export type User =  { 
    id ?: number, 
    username ?: string, 
    email ?: string, 
    firstname ?: string, 
    phone?: string, 
    user_type ?: 'عميل' | 'معبر', 
    image_url ?: string, 
    profile ?: {
        bank_account?: string, 
        gender ?: 'ذكر' | 'انثى',
        birthday ?: string , 
        martial_status ?: string, 
        profession ?: string, 
    }

}


type Notification = {
    user: User;
    sender: User;
    message: string;
    read: boolean;
    date: string;
    url: string;
};
