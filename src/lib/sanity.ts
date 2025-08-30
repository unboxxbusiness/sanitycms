import {createClient, type SanityClient} from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-01';

// For development, we want to ensure we are always getting the freshest data.
// For production, we want to cache the data for performance.
const useCdn = process.env.NODE_ENV === 'production'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  // Automatically tag all queries with the document types they reference
  next: {
    tags: ['post', 'author', 'category', 'settings', 'page', 'homePage', 'partner', 'testimonial', 'program', 'impactMetric', 'donationTier', 'reusableBlock']
  }
});

/**
 * A helper function to fetch data with consistent settings.
 * This is used to ensure that all fetches are either using the CDN or not,
 * and that we are using the correct revalidation tags.
 */
export async function sanityFetch<QueryResponse>({
    query,
    params = {},
    tags,
}: {
    query: string;
    params?: any;
    tags?: string[];
}): Promise<QueryResponse> {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const sanityClient: SanityClient = client.withConfig({
        // You need to set this environment variable for live preview to work
        token: process.env.SANITY_API_READ_TOKEN,
        // The stega config will be ignored server-side
        stega: {
            enabled: false,
            studioUrl: '/studio',
        },
    });

    return sanityClient.fetch<QueryResponse>(query, params, {
        // We only want to cache the data in production
        cache: isDevelopment ? 'no-store' : 'force-cache',
        next: {
            // Revalidate the data at most every 3600 seconds
            revalidate: 3600,
            tags,
        },
    });
}
