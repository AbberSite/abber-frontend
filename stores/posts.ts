
import type { PaginationResponse, Post } from '~/types';
import { useApiCache } from '~/composables/useApiCache';

class PostsStore {

    posts = ref<PaginationResponse<Post>>({ results: [] });

    firstThreePosts = computed(() => this.posts.value?.results?.filter((post, index) => index < 3)) ?? [];

    bookmarkedTotal = ref<number | undefined>(0);

    selectedCategory = ref('');
    categories = ref<{count: number; results?: Array<{ name: string; id: string; posts_count: number }> }>({ results: [] });

    fetchAll = async () => {
        const data = await useApiCache<PaginationResponse<Post>>('/api/blog/posts?active=true&accepted=true', {
            ttl: 600000,
            tags: ['posts'],
            key: 'all-posts'
        });
        this.posts.value = data;
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
