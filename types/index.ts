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


export type Notification = {
    id? : number,
    type: 'success' | 'warning' | 'info' | 'danger';
    content: string;
};
