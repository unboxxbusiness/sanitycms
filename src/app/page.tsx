
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee, Languages, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const headline = "Unlock India's Potential with AmulyaX";
  const description = "We provide innovative technology solutions tailored for the Indian market, empowering businesses and individuals to achieve growth and efficiency.";
  const callToAction = "Get Started Today";

  const features = [
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: 'Localized Solutions',
      description: 'Built for India, with features and integrations that understand the nuances of the local market.',
      dataAiHint: 'india map'
    },
    {
      icon: <Languages className="h-8 w-8 text-primary" />,
      title: 'Multilingual Support',
      description: 'Communicate with your customers in their preferred language, from Hindi to Tamil.',
      dataAiHint: 'language translation'
    },
    {
      icon: <IndianRupee className="h-8 w-8 text-primary" />,
      title: 'Affordable Pricing',
      description: 'Get access to world-class technology at prices that make sense for the Indian economy.',
      dataAiHint: 'money currency'
    },
  ];

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
                  {headline}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  {description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="#contact">{callToAction}</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="animate-fade-in">
                <Image
                  src="https://picsum.photos/800/600"
                  alt="Abstract technology background"
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
                    {features.map((feature, index) => (
                        <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
                            <CardHeader>
                                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                                    {feature.icon}
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
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="shadow-lg bg-card">
                            <CardContent className="pt-6">
                                <p className="text-muted-foreground mb-4">"AmulyaX India has transformed our business operations. The AI insights are a game-changer and the support is top-notch."</p>
                                <div className="flex items-center gap-4">
                                    <Image src={`https://picsum.photos/id/${100+i}/40/40`} alt="Customer photo" width={40} height={40} className="rounded-full" data-ai-hint="person portrait" />
                                    <div>
                                        <p className="font-semibold">Priya Sharma</p>
                                        <p className="text-sm text-muted-foreground">CEO, TechInnovate</p>
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
