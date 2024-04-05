type Meeting = {
  meeting_number: string;
  password: string;
  sessions_count: number;
  signature: string;
  order_item_id: number | string | undefined
};
type User = {
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

type Notification = {
  id?: number;
  type: 'success' | 'warning' | 'info' | 'danger';
  content: string;
};

interface PaginationResponse<Type> {
  count?: number;
  next?: string;
  previous?: string;
  results: Type[];
}

type Testimonial = {
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
type Service = {
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
};

type OrderForm = {
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
  authenticationMethod?: 'login' | 'login-sms' | 'register' | 'guest' | 'otp';
  order_id?: string;
};

type Post = {
  id: string;
  user: string;
  post_category: Category;
  title: string;
  content: string;
  meta_content: string;
  image: string;
  image_alt: string;
  slug: string;
  active: boolean;
  bookmark: [];
};

type Category = {
  id: number;
  name: string;
};

type Order = {
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
  };
};

type File = {
  id: number;
  file: string;
  name: string;
};

type Message = {
  id: number;
  user: {
    username: string;
    first_name: string;
    last_name: string;
    image: string;
    is_online: boolean;
  };
  last_message: {
    id: number;
    user: {
      username: string;
      first_name: string;
      last_name: string;
      image: string;
      is_online: boolean;
    };
    date: string;
  };
  files?: File[];
  message: string | string[];
  room: string;
  date: string;
  read: boolean;
  index: number;
  deleted: boolean;
};

type BalanceRecord = {
  user: string;
  balance: number;
  date: string;
  type: 'credit' | 'debit';
  transaction: number;
};

type Transaction = {
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

type ZoomAccount = {
  active: boolean,
  zoom_email: string
}
