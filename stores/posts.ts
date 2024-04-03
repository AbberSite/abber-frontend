import type { PaginationResponse, Post } from '~/types';

class PostsStore {
    // total = ref<number | undefined>(0);

    posts = ref<PaginationResponse<Post>>({ results: [] });

    firstThreePosts = computed(() => this.posts.value?.results?.filter((post, index) => index < 3)) ?? [];

    bookmarkedTotal = ref<number | undefined>(0);

    selectedCategory = ref('');
    categories = ref<{ results?: Array<{ name: string; id: string; posts_count: number }> }>({ results: [] });

    fetchAll = async () => {
        const { data } = (await useFetch(`/api/blog/posts`, {
            params: {
                active: true,
                accepted: true
            }
        })) as { data: Ref<PaginationResponse<Post>> };

        // this.total.value = data.value?.count;
        // this.total.value = 250;
        this.posts.value = data.value;
    };

    fetchBookmarked = async (): Promise<Post[]> => {
        const { data: user } = useAuth();

        const { data } = (await useFetch(`/api/blog/posts`, {
            params: {
                bookmark: user.value.id
            }
        })) as { data: Ref<PaginationResponse<Post>> };

        this.bookmarkedTotal.value = data.value?.count ?? 0;

        return data.value?.results;
    };
}

export const usePostsStore = defineStore('posts', () => new PostsStore());
