export type User = {
  id?: number;
  username?: string;
  email?: string;
  firstname?: string;
  phone?: string;
  user_type?: 'عميل' | 'معبر';
  image_url?: string;
  profile?: {
    bank_account?: string;
    gender?: 'ذكر' | 'انثى';
    birthday?: string;
    martial_status?: string;
    profession?: string;
  };
};

type _User = {
  username: string;
  first_name: string;
  last_name: string;
  image: string;
  is_online: boolean;
};

export type Notification = {
  id?: number;
  type: 'success' | 'warning' | 'info' | 'danger';
  content: string;
  sender?: {
    first_name: string;
  };
  user?: {
    first_name: string;
  };
  message?: string;
  date?: string;
  url?: string;
  extra_data:{
    type?:string,
    order_type?:string,
  }

};

export interface PaginationResponse<Type> {
  count?: number;
  next?: string;
  previous?: string;
  results: Type[];
}

export type Testimonial = {
  id: number;
  user: _User;
  rate: number;
  registration_and_login: number;
  online_payment: number;
  support_and_complaints: number;
  find_expressor: number;
  intend_to_use_again: boolean;
  recommend_to_others: boolean;
  additional_comments: string;
  suggestions: string;
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
  service_methods: {
    type: 'voice_communication' | 'text_communication';
    price: number;
  }[];
  in_wishlist: boolean;
  work_hours?: string;
};

export type OrderForm = {
  inputType?: 'text_chat' | 'voice_chat';
  type?: 'text_communication' | 'video_communication';
  dream_title?: string;
  dream_time?: string;
  dream?: string;
  client?: boolean;
  age?: number;
  gender?: string;
  marital_status?: string;
  profession?: string;
  recordedAudio?: Blob;
  service_id?: number;
  selectedService?: number;
  selectedServices?: number[];
  authenticationMethod?: 'login' | 'register' | 'whatsapp' | 'login-sms' | 'otp';
  order_id?: string;
  orders?: string[]
};

export type Post = {
  id: string;
  user?: string;
  post_category?: Category;
  title?: string;
  content?: string;
  meta_content?: string;
  image?: string;
  image_alt?: string;
  slug?: string;
  active?: boolean;
  bookmark?: [];
  reading_time?: number | null;
};

export type Category = {
  id: number;
  name: string;
};

export type Order = {
  id: string;
  buyer: {
    username: string;
    first_name: string;
    last_name: string;
    image: string;
  };
  status: 'in_progress' | 'complete' | 'waiting_for_cancellation' | 'cancelled' | 'new' | 'awaiting_delivery';
  type: 'text_communication' | 'video_communication';
  service: string;
  service_details: Service;
  order_item_time_data: {
    ordered_date: string;
    complete_date?: string;
    start_date?: string;
    alerted: boolean;
  };
  add_review?: string;
  dream_title?: string;
  seller?: {
    username: string;
    first_name: string;
    last_name: string;
    image: string;
    is_online: boolean;
  };
  content?: {
    allow_chat?: boolean;
    inquiry?: boolean;
  }
};

export type File = {
  id: number;
  file: string;
  name: string;
  mimetype: string
};

export type Message = {
  id: number;
  user: {
    username: string;
    first_name: string;
    last_name: string;
    image: string;
    is_online: boolean;
  };
  files?: File[];
  message: string | string[];
  room: string;
  date: string;
  read: boolean;
  index: number;
  deleted: boolean;
  sent?: boolean;
};

export type BalanceRecord = {
  user: string;
  balance: number;
  date: string;
  type: 'credit' | 'debit';
  transaction: number;
};

export type Transaction = {
  id: number;
  amount: number;
  date: string;
  type: string;
  status: string;
  method: string;
  balance_record: BalanceRecord[];
  user: string;
  process_additional_data: {
    merchant_amount: number;
  };
  performed: boolean;
};


export type Ticket = {
  id: number;
  title: string;
  user: _User;
  status: string;
  date: string;
  end_date: string;
};

export type Coupon = {
  id: number;
  code: string;
  start_date: string;
  end_date: string;
  amout: number;
  multi_use: boolean;
  type: string;
  user: number;
};


export type Card = {
  bin: number;
  binCountry: string
  last4Digits: number,
  holder: string;
  expiryMonth: string;
  expiryYear: number,
  issuer: {
    bank: string;
    website: string;
    phone: string;
  },

};

export type Rate = {
  id: number;
  service: string;
  user: {
    username: string;
    first_name: string;
    last_name: string;
    image: string;
    is_online: boolean;

  };
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

export type Offer = {
  id: number;
  type: 'percentage' | 'fixed_amount';
  text: boolean;
  text_amount: number;
  video: boolean;
  video_amount: number;
  service: number;
  start_date: string;
  end_date: string;
};
export type withdrawalRequest = {
  id: number;
  amount: number;
  status: string;
  type: string; 
  date: string;
  paid: boolean;
  refuse_reason: string;
};

export type UserNotification = {
  username: string;
  first_name: string;
  last_name: string;
  image: string;
  is_online: boolean;
};
export type NotificationHeader = {
  user: UserNotification;
  sender: UserNotification;
  message: string;
  read?: boolean;
  date: string;
  url: string;
};


export type OrdersPackage = {
  id: Number;
  name: String;
  description: String;
  price_before_discount: Number;
  price: Number;
  num_orders: Number;
  active: Boolean;
  index: Number;
  expressors: Object[];
  duration: Number;
};
