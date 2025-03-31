
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ArrowUpRight, Clock, Calendar, BarChart4, Star, Search } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MarketNews as MarketNewsType } from '@/types';

// Mock market news data
const mockMarketNews: MarketNewsType[] = [
  {
    id: "news1",
    title: "RBI Keeps Repo Rate Unchanged at 6.5% for Seventh Consecutive Time",
    snippet: "The central bank maintained its stance amid economic growth concerns and persistent inflation.",
    content: "The Reserve Bank of India (RBI) on Friday kept the repo rate unchanged at 6.5 percent for the seventh consecutive time, in line with market expectations. The central bank maintained its stance amid concerns over economic growth and persistent inflation. The decision was taken during the three-day monetary policy committee meeting that concluded today. Governor Shaktikanta Das announced that the decision to maintain status quo on the repo rate was unanimous. The RBI also kept its stance unchanged at 'withdrawal of accommodation.'",
    date: new Date('2023-08-10'),
    source: "Economic Times",
    imageUrl: "https://example.com/news1.jpg",
    category: "policy"
  },
  {
    id: "news2",
    title: "Sensex, Nifty Hit Record Highs as FIIs Return to Indian Markets",
    snippet: "Foreign institutional investors have pumped in over ₹20,000 crore in Indian equities in August so far.",
    content: "Indian benchmark indices Sensex and Nifty touched fresh all-time highs on Monday as foreign institutional investors (FIIs) continued their buying spree in domestic equities. The BSE Sensex surged over 500 points to breach the 67,000 mark for the first time, while the NSE Nifty 50 crossed the 20,000 level. FIIs have pumped in over ₹20,000 crore into Indian equities in August so far, following a net inflow of ₹45,000 crore in July. Analysts attribute this bullish trend to India's robust economic growth prospects, moderating inflation, and the anticipation of a potential pause in interest rate hikes by the US Federal Reserve.",
    date: new Date('2023-08-14'),
    source: "CNBC-TV18",
    imageUrl: "https://example.com/news2.jpg",
    category: "market"
  },
  {
    id: "news3",
    title: "SIP Investments in Mutual Funds Hit New Monthly Record of ₹18,000 Crore",
    snippet: "Indian retail investors continue to show strong faith in systematic investment plans despite market volatility.",
    content: "Systematic Investment Plan (SIP) inflows into mutual funds reached a new monthly record of ₹18,000 crore in July 2023, according to data released by the Association of Mutual Funds in India (AMFI). This marks the 30th consecutive month of net inflows through the SIP route, highlighting Indian retail investors' growing preference for disciplined investing. The number of SIP accounts also crossed the 70 million mark for the first time. Industry experts suggest that this consistent trend demonstrates retail investors' maturity in viewing market volatility as an opportunity rather than a threat. The mutual fund industry's assets under management (AUM) now stand at a record ₹46 lakh crore.",
    date: new Date('2023-08-07'),
    source: "Mint",
    imageUrl: "https://example.com/news3.jpg",
    category: "funds"
  },
  {
    id: "news4",
    title: "GDP Growth Projected at 6.8% for FY24, Making India Fastest Growing Major Economy",
    snippet: "India's robust domestic consumption and investment recovery are driving economic growth amid global slowdown.",
    content: "India's GDP is projected to grow at 6.8% in fiscal year 2023-24, according to the latest report by the International Monetary Fund (IMF), positioning the country as the fastest-growing major economy in the world. The report highlighted India's robust domestic consumption, recovering investment cycle, and strengthening manufacturing sector as key drivers of this growth. While advanced economies are expected to grow at just 1.5% on average, India's resilience amidst global economic challenges has been remarkable. The government's push for infrastructure development, production-linked incentive schemes, and digital public infrastructure are creating a strong foundation for sustained long-term growth, the report added.",
    date: new Date('2023-08-02'),
    source: "Business Standard",
    imageUrl: "https://example.com/news4.jpg",
    category: "economy"
  },
  {
    id: "news5",
    title: "Government Introduces New Tax Benefits for ELSS Mutual Funds in Budget",
    snippet: "The enhanced tax deduction limit aims to boost long-term equity investments among retail investors.",
    content: "The Finance Minister announced new tax incentives for Equity Linked Savings Schemes (ELSS) in the Union Budget, increasing the deduction limit under Section 80C specifically for ELSS investments from ₹1.5 lakh to ₹2 lakh per financial year. This move is aimed at channelizing more retail investments into the equity markets and promoting long-term financial planning. ELSS funds, which already have the shortest lock-in period of three years among tax-saving instruments, are expected to see significant inflows following this announcement. Industry experts believe this could potentially add ₹15,000-20,000 crore in additional annual inflows to mutual funds, further deepening retail participation in equity markets.",
    date: new Date('2023-07-28'),
    source: "Financial Express",
    imageUrl: "https://example.com/news5.jpg",
    category: "policy"
  }
];

const MarketNews = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredNews = mockMarketNews
    .filter(news => {
      // Filter by tab category
      if (activeTab !== 'all' && news.category !== activeTab) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery) {
        return (
          news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          news.snippet.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      return true;
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };
  
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'market':
        return 'bg-blue-100 text-blue-800';
      case 'funds':
        return 'bg-green-100 text-green-800';
      case 'economy':
        return 'bg-purple-100 text-purple-800';
      case 'policy':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'market':
        return 'Market Update';
      case 'funds':
        return 'Fund News';
      case 'economy':
        return 'Economy';
      case 'policy':
        return 'Policy';
      default:
        return category;
    }
  };

  return (
    <PageContainer 
      title="Market News" 
      headerRight={
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative"
          onClick={() => navigate('/notifications')}
        >
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>
      }
    >
      {/* Market Summary Card */}
      <Card className="mb-6 bg-gradient-to-br from-green-50 to-blue-50">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Market Summary</h3>
            <Clock size={14} className="text-gray-500" />
          </div>
          
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 mt-4">
            <div>
              <p className="text-xs text-gray-500 flex items-center">
                <span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-1"></span>
                SENSEX
              </p>
              <div className="flex items-baseline">
                <p className="font-semibold">66,422</p>
                <p className="text-xs text-fundeasy-green ml-1">+0.42%</p>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-gray-500 flex items-center">
                <span className="inline-block w-3 h-3 bg-blue-400 rounded-full mr-1"></span>
                NIFTY 50
              </p>
              <div className="flex items-baseline">
                <p className="font-semibold">19,819</p>
                <p className="text-xs text-fundeasy-green ml-1">+0.36%</p>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-gray-500 flex items-center">
                <span className="inline-block w-3 h-3 bg-amber-400 rounded-full mr-1"></span>
                GOLD
              </p>
              <div className="flex items-baseline">
                <p className="font-semibold">₹58,340</p>
                <p className="text-xs text-fundeasy-red ml-1">-0.12%</p>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-gray-500 flex items-center">
                <span className="inline-block w-3 h-3 bg-purple-400 rounded-full mr-1"></span>
                USD/INR
              </p>
              <div className="flex items-baseline">
                <p className="font-semibold">82.67</p>
                <p className="text-xs text-fundeasy-red ml-1">-0.08%</p>
              </div>
            </div>
          </div>
          
          <Button 
            variant="link" 
            className="text-fundeasy-green p-0 h-auto text-xs mt-4"
            onClick={() => navigate('/market-data')}
          >
            See detailed market data <ArrowUpRight size={12} className="ml-1" />
          </Button>
        </CardContent>
      </Card>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search news..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* News Categories */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full mb-4 bg-transparent border-b p-0 h-auto">
          <TabsTrigger 
            value="all" 
            className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-fundeasy-green data-[state=active]:shadow-none rounded-none py-2"
          >
            All
          </TabsTrigger>
          <TabsTrigger 
            value="market" 
            className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-fundeasy-green data-[state=active]:shadow-none rounded-none py-2"
          >
            Markets
          </TabsTrigger>
          <TabsTrigger 
            value="funds" 
            className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-fundeasy-green data-[state=active]:shadow-none rounded-none py-2"
          >
            Funds
          </TabsTrigger>
          <TabsTrigger 
            value="economy" 
            className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-fundeasy-green data-[state=active]:shadow-none rounded-none py-2"
          >
            Economy
          </TabsTrigger>
        </TabsList>

        {/* News List - Same for all tabs, just filtered differently */}
        <div className="space-y-4 mb-20">
          {filteredNews.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <BarChart4 size={40} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No news found</p>
              <p className="text-xs text-gray-400">Try a different search or category</p>
            </div>
          ) : (
            filteredNews.map(news => (
              <Card 
                key={news.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/news/${news.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={`${getCategoryColor(news.category)} font-normal`}>
                      {getCategoryLabel(news.category)}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar size={12} className="mr-1" />
                      {formatDate(news.date)}
                    </div>
                  </div>
                  
                  <h3 className="font-medium line-clamp-2 mb-2">{news.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{news.snippet}</p>
                  
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500">Source: {news.source}</p>
                    <Button variant="ghost" size="sm" className="h-8 text-fundeasy-green">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </Tabs>
    </PageContainer>
  );
};

export default MarketNews;
