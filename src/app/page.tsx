import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee, Languages, MapPin } from 'lucide-react';
import Link from 'next/link';
import { client } from '@/lib/sanity';
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface HomePageData {
  hero: {
    headline: string;
    description: string;
    callToAction: string;
    image: SanityImageSource;
    imageAlt: string;
  };
  features: {
    _key: string;
    icon: string;
    title: string;
    description: string;
    dataAiHint: string;
  }[];
  testimonials: {
    _key: string;
    quote: string;
    author: string;
    title: string;
    image: SanityImageSource;
  }[];
}

async function getHomePageData(): Promise<HomePageData> {
  const query = `*[_type == "homePage"][0]{
    hero,
    "features": features[]->{_id, _key, title, description, icon, dataAiHint},
    "testimonials": testimonials[]->{_id, _key, quote, author, title, image}
  }`;
  const data = await client.fetch(query, {}, {
    // With this cache setting, the page will be statically generated at build time and revalidated every 60 seconds.
    next: { revalidate: 60 }
  });
  return data;
}

const builder = imageUrlBuilder(client)

function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

const iconMap: { [key: string]: React.ReactNode } = {
  'MapPin': <MapPin className="h-8 w-8 text-primary" />,
  'Languages': <Languages className="h-8 w-8 text-primary" />,
  'IndianRupee': <IndianRupee className="h-8 w-8 text-primary" />
};

export default async function Home() {
  const data = await getHomePageData();

  if (!data) {
    // This is a fallback for when Sanity data is not available
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to AmulyaX India</h1>
        <p>Content is being loaded. Please set up your Sanity project.</p>
        <p className="mt-4">
          <Link href="/studio" className="text-blue-500 hover:underline">
            Go to Sanity Studio
          </Link>
        </p>
      </div>
    );
  }

  const { hero, features, testimonials } = data;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-center md:text-left animate-fade-in-up">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-primary">
                  {hero.headline}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  {hero.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="#contact">{hero.callToAction}</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="animate-fade-in">
                <Image
                  src={urlFor(hero.image).width(800).height(600).url()}
                  alt={hero.imageAlt}
                  width={800}
                  height={600}
                  className="rounded-xl shadow-2xl"
                  data-ai-hint="abstract technology"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-28 bg-secondary/20">
            <div className="container mx-auto px-4">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Why Choose AmulyaX India?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Discover the powerful features that make our platform the best choice for your needs in India.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <Card key={feature._key} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
                            <CardHeader>
                                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                                    {iconMap[feature.icon] || <MapPin className="h-8 w-8 text-primary" />}
                                </div>
                                <CardTitle className="mt-4">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Loved by Teams Across India</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">See what our customers have to say about their experience with AmulyaX India.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial._key} className="shadow-lg bg-card">
                            <CardContent className="pt-6">
                                <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <Image src={urlFor(testimonial.image).width(40).height(40).url()} alt="Customer photo" width={40} height={40} className="rounded-full" data-ai-hint="person portrait" />
                                    <div>
                                        <p className="font-semibold">{testimonial.author}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
