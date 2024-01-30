type Post = {
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

type Response = {
    count?: number;
    next?: string;
    previous?: string;
    results?: Post[];
};

class PostsStore {
    total = ref<number | undefined>(0);

    posts = ref<Post[]|undefined>([]);

    firstThreePosts = computed(() => this.posts.value?.filter((post, index) => index < 3)) ?? [];

    fetchAll = async () => {

        const { data } = (await useFetch(`/api/blog/posts`, {
            params: {
                active: true,
                accepted: true
            }
        })) as { data: Ref<Response> };

        this.total.value = data.value?.count;
        this.posts.value = data.value?.results

    };
}

export const usePostsStore = defineStore('posts', () => new PostsStore());
