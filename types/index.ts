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


type _User = {
    username: string;
    first_name: string;
    last_name: string;
    image: string;
    is_online: boolean;
};

export type Notification = {
    id? : number,
    type: 'success' | 'warning' | 'info' | 'danger';
    content: string;
};


export interface PaginationResponse <Type> {
    count?: number;
    next?: string;
    previous?: string;
    results: Type[];
}

export type Testimonial = {
    id: number;
    service: string;
    user: _User;
    date: string;
    professional_rate: number;
    communication_rate: number;
    quality_rate: number;
    expertise_rate: number;
    delivery_rate: number;
    again_rate: number;
    comment: string;
    order_id: number;
};

