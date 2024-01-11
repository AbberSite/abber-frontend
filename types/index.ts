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
    user: _User;
    rate: number,
    registration_and_login: number,
    online_payment: number,
    support_and_complaints: number,
    find_expressor: number,
    intend_to_use_again: boolean,
    recommend_to_others: boolean,
    additional_comments: string,
    suggestions: string
};
export type Service = {
    id: number;
    seller: {
        username: string;
        first_name: string;
        last_name: string;
        image: string;
        is_online: boolean;
        about: string;
    };
    creation_date: string;
    active: boolean;
    admin_active: boolean;
    rate: number;
    ordered_count: number;
    service_prices: {
        video: boolean;
        text: boolean;
        text_price: number;
        video_price: number;
    };
    text_service_capacity: {
        maximum_orders: number;
        stock: number;
    };
    service_methods: [
        {
            type: string;
            price: number;
        }
    ];
    in_wishlist: boolean;
}
