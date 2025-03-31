
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Share2, Bookmark, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MarketNews } from '@/types';

// Mock market news data (would normally come from a database)
const mockMarketNews: MarketNews[] = [
  {
    id: "news1",
    title: "RBI Keeps Repo Rate Unchanged at 6.5% for Seventh Consecutive Time",
    snippet: "The central bank maintained its stance amid economic growth concerns and persistent inflation.",
    content: "The Reserve Bank of India (RBI) on Friday kept the repo rate unchanged at 6.5 percent for the seventh consecutive time, in line with market expectations. The central bank maintained its stance amid concerns over economic growth and persistent inflation.\n\nThe decision was taken during the three-day monetary policy committee meeting that concluded today. Governor Shaktikanta Das announced that the decision to maintain status quo on the repo rate was unanimous.\n\nThe RBI also kept its stance unchanged at 'withdrawal of accommodation.' This means that the central bank continues to focus on bringing down inflation to its target level.\n\n\"Inflation has moderated but remains above the 4% target,\" Das said during the policy announcement. \"The MPC will remain highly alert to any signs of sustained rise in inflation and will take timely action.\"\n\nThe central bank has revised its GDP growth forecast for FY24 to 7% from the earlier projection of 6.5%, citing robust domestic economic activity.\n\nHowever, the RBI revised its inflation projection for FY24 to 4.5% from 4.3% earlier, factoring in elevated food prices.\n\nExperts believe that the RBI's decision to hold rates steady for the seventh consecutive time indicates that it is in no hurry to change its monetary policy stance until inflation consistently moves closer to the 4% target.",
    date: new Date('2023-08-10'),
    source: "Economic Times",
    imageUrl: "https://example.com/news1.jpg",
    category: "policy"
  },
  {
    id: "news2",
    title: "Sensex, Nifty Hit Record Highs as FIIs Return to Indian Markets",
    snippet: "Foreign institutional investors have pumped in over ₹20,000 crore in Indian equities in August so far.",
    content: "Indian benchmark indices Sensex and Nifty touched fresh all-time highs on Monday as foreign institutional investors (FIIs) continued their buying spree in domestic equities.\n\nThe BSE Sensex surged over 500 points to breach the 67,000 mark for the first time, while the NSE Nifty 50 crossed the 20,000 level.\n\nFIIs have pumped in over ₹20,000 crore into Indian equities in August so far, following a net inflow of ₹45,000 crore in July. Analysts attribute this bullish trend to India's robust economic growth prospects, moderating inflation, and the anticipation of a potential pause in interest rate hikes by the US Federal Reserve.\n\n\"The return of FIIs to Indian equities has been a major driver for the current rally,\" said market expert Rajesh Sharma. \"India's economic resilience amid global challenges makes it an attractive investment destination.\"\n\nThe rally was broad-based with banking, IT, and auto stocks leading the gains. HDFC Bank, Reliance Industries, Infosys, and ICICI Bank were among the top contributors to the Sensex's rise.\n\nSmall and mid-cap stocks also participated in the rally, with their respective indices hitting new highs. This suggests that the bullish sentiment is not limited to just large-cap stocks.\n\nHowever, some analysts are cautioning about stretched valuations and advise investors to remain selective in their stock picking approach.\n\n\"While the momentum is strong, investors should focus on companies with strong fundamentals and reasonable valuations,\" advised Priya Mehta, a market strategist at a leading brokerage firm.",
    date: new Date('2023-08-14'),
    source: "CNBC-TV18",
    imageUrl: "https://example.com/news2.jpg",
    category: "market"
  },
  {
    id: "news3",
    title: "SIP Investments in Mutual Funds Hit New Monthly Record of ₹18,000 Crore",
    snippet: "Indian retail investors continue to show strong faith in systematic investment plans despite market volatility.",
    content: "Systematic Investment Plan (SIP) inflows into mutual funds reached a new monthly record of ₹18,000 crore in July 2023, according to data released by the Association of Mutual Funds in India (AMFI).\n\nThis marks the 30th consecutive month of net inflows through the SIP route, highlighting Indian retail investors' growing preference for disciplined investing. The number of SIP accounts also crossed the 70 million mark for the first time.\n\nIndustry experts suggest that this consistent trend demonstrates retail investors' maturity in viewing market volatility as an opportunity rather than a threat. The mutual fund industry's assets under management (AUM) now stand at a record ₹46 lakh crore.\n\n\"The steady rise in SIP investments reflects the growing maturity of Indian investors who understand the benefits of disciplined and regular investing,\" said Navneet Munot, Chairman of AMFI.\n\nEquity-oriented mutual fund schemes continued to see strong inflows, with large-cap, flexi-cap, and small-cap funds being the most preferred categories. Sectoral funds, particularly those focused on manufacturing, infrastructure, and banking, also attracted significant investor interest.\n\nThe data also reveals an increasing trend of SIP investments flowing into index funds and ETFs, indicating growing awareness about passive investment strategies.\n\nFinancial advisors attribute this sustained growth in SIP investments to increasing financial literacy, easy access to mutual funds through digital platforms, and the growing realization that SIPs offer one of the best ways to create wealth over the long term.\n\n\"Many first-time investors are starting their investment journey with SIPs, which is a positive trend for the Indian mutual fund industry,\" noted Sundeep Sikka, CEO of Nippon India Mutual Fund.",
    date: new Date('2023-08-07'),
    source: "Mint",
    imageUrl: "https://example.com/news3.jpg",
    category: "funds"
  },
  {
    id: "news4",
    title: "GDP Growth Projected at 6.8% for FY24, Making India Fastest Growing Major Economy",
    snippet: "India's robust domestic consumption and investment recovery are driving economic growth amid global slowdown.",
    content: "India's GDP is projected to grow at 6.8% in fiscal year 2023-24, according to the latest report by the International Monetary Fund (IMF), positioning the country as the fastest-growing major economy in the world.\n\nThe report highlighted India's robust domestic consumption, recovering investment cycle, and strengthening manufacturing sector as key drivers of this growth. While advanced economies are expected to grow at just 1.5% on average, India's resilience amidst global economic challenges has been remarkable.\n\nThe government's push for infrastructure development, production-linked incentive schemes, and digital public infrastructure are creating a strong foundation for sustained long-term growth, the report added.\n\n\"India remains a bright spot in the global economy, with strong domestic fundamentals offsetting external headwinds,\" stated IMF Chief Economist Pierre-Olivier Gourinchas.\n\nPrivate consumption, which accounts for nearly 60% of India's GDP, is expected to grow at 6.7% in FY24, supported by improving rural demand and steady urban consumption.\n\nInvestment growth is projected to accelerate to 7.4%, driven by government capital expenditure and improving capacity utilization in the manufacturing sector.\n\nHowever, the report also highlighted some challenges, including persistent inflation, especially in food items, and the need for further fiscal consolidation. The current account deficit is expected to moderate to 1.8% of GDP in FY24 from 2.2% in FY23, benefiting from lower commodity prices and strong services exports.\n\nThe IMF recommended that India should continue its focus on structural reforms to sustain high growth rates over the medium term. These include improving infrastructure, enhancing skill development, simplifying regulations, and deepening financial markets.",
    date: new Date('2023-08-02'),
    source: "Business Standard",
    imageUrl: "https://example.com/news4.jpg",
    category: "economy"
  },
  {
    id: "news5",
    title: "Government Introduces New Tax Benefits for ELSS Mutual Funds in Budget",
    snippet: "The enhanced tax deduction limit aims to boost long-term equity investments among retail investors.",
    content: "The Finance Minister announced new tax incentives for Equity Linked Savings Schemes (ELSS) in the Union Budget, increasing the deduction limit under Section 80C specifically for ELSS investments from ₹1.5 lakh to ₹2 lakh per financial year.\n\nThis move is aimed at channelizing more retail investments into the equity markets and promoting long-term financial planning. ELSS funds, which already have the shortest lock-in period of three years among tax-saving instruments, are expected to see significant inflows following this announcement.\n\nIndustry experts believe this could potentially add ₹15,000-20,000 crore in additional annual inflows to mutual funds, further deepening retail participation in equity markets.\n\n\"This is a very positive move that will encourage more retail investors to participate in the equity markets through the mutual fund route,\" said Nilesh Shah, MD of Kotak Mahindra Asset Management Company.\n\nThe government has also announced that the 3-year lock-in period for ELSS funds will remain unchanged, maintaining the balance between tax benefits and liquidity for investors.\n\nMutual fund industry representatives have welcomed this move, stating that it will help in channelizing household savings into productive financial assets and contribute to capital formation in the economy.\n\n\"This will significantly boost the mutual fund industry and help in financial inclusion by bringing more first-time investors into the fold,\" said A Balasubramanian, Chairman of AMFI.\n\nMarket participants expect this measure to particularly benefit young professionals who are looking for tax-saving options with good returns potential.\n\nInvestors should note that while this enhanced deduction limit offers tax benefits, investment decisions should still be based on their financial goals, risk appetite, and the fund's performance track record.",
    date: new Date('2023-07-28'),
    source: "Financial Express",
    imageUrl: "https://example.com/news5.jpg",
    category: "policy"
  }
];

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

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Find the news article by ID
  const newsArticle = mockMarketNews.find(news => news.id === id);
  
  if (!newsArticle) {
    return (
      <PageContainer showBackButton>
        <div className="flex flex-col items-center justify-center py-16">
          <h2 className="text-xl font-semibold mb-2">News Not Found</h2>
          <p className="text-gray-500 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Button 
            onClick={() => navigate('/market-news')}
            className="bg-fundeasy-green hover:bg-fundeasy-dark-green"
          >
            Back to News
          </Button>
        </div>
      </PageContainer>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  
  const handleShare = () => {
    // In a real app, you would implement web share API here
    toast({
      title: "Link Copied",
      description: "Article link copied to clipboard.",
    });
  };
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from Bookmarks" : "Added to Bookmarks",
      description: isBookmarked 
        ? "Article removed from your bookmarks." 
        : "Article saved to your bookmarks.",
    });
  };

  return (
    <PageContainer 
      showBackButton
      headerRight={
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 rounded-full"
            onClick={handleShare}
          >
            <Share2 size={18} />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`h-8 w-8 p-0 rounded-full ${isBookmarked ? 'text-fundeasy-green' : ''}`}
            onClick={handleBookmark}
          >
            <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
          </Button>
        </div>
      }
    >
      <div className="mb-4">
        <Badge className={`${getCategoryColor(newsArticle.category)} font-normal mb-2`}>
          {getCategoryLabel(newsArticle.category)}
        </Badge>
        <h1 className="text-xl font-bold leading-tight mb-2">{newsArticle.title}</h1>
        <div className="flex items-center text-gray-500 text-sm space-x-4">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            {formatDate(newsArticle.date)}
          </div>
          <div>Source: {newsArticle.source}</div>
        </div>
      </div>
      
      {/* News Content */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <p className="text-gray-700 italic mb-4">{newsArticle.snippet}</p>
          {newsArticle.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </CardContent>
      </Card>
      
      {/* Related Articles */}
      <div className="mb-16">
        <h3 className="font-semibold mb-3">Related News</h3>
        <div className="space-y-3">
          {mockMarketNews
            .filter(news => news.id !== id && news.category === newsArticle.category)
            .slice(0, 2)
            .map(news => (
              <Card 
                key={news.id} 
                className="hover:bg-gray-50 transition cursor-pointer"
                onClick={() => navigate(`/news/${news.id}`)}
              >
                <CardContent className="p-3">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium line-clamp-2 text-sm">{news.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(news.date)}</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-4"
          onClick={() => navigate('/market-news')}
        >
          View All News
        </Button>
      </div>
    </PageContainer>
  );
};

export default NewsDetail;

// A custom ChevronRight icon for the related articles section
const ChevronRight = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
