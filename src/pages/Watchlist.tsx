
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, TrendingUp, TrendingDown, Trash2, Star, Search, Filter } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';
import { mockMutualFunds } from '@/utils/mockData';
import { WatchlistItem, MutualFund } from '@/types';

// Mock watchlist data
const mockWatchlist: WatchlistItem[] = [
  {
    id: "watch1",
    fundId: "fund1",
    addedDate: new Date('2023-07-15'),
    notes: "Suggested by financial advisor, consider for long-term goals"
  },
  {
    id: "watch2",
    fundId: "fund3",
    addedDate: new Date('2023-07-28'),
    notes: "Good returns, low expense ratio"
  },
  {
    id: "watch3",
    fundId: "fund5",
    addedDate: new Date('2023-08-10'),
    notes: "For retirement portfolio"
  }
];

const Watchlist = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string>('date');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  
  // Combine watchlist data with fund details
  const watchlistWithDetails = mockWatchlist.map(item => {
    const fund = mockMutualFunds.find(f => f.id === item.fundId);
    return { ...item, fund };
  }).filter(item => item.fund);
  
  // Filter watchlist based on search query
  const filteredWatchlist = watchlistWithDetails.filter(item => {
    if (!item.fund) return false;
    
    if (searchQuery) {
      return (
        item.fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fund.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.notes && item.notes.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return true;
  });
  
  // Sort watchlist items
  const sortedWatchlist = [...filteredWatchlist].sort((a, b) => {
    if (!a.fund || !b.fund) return 0;
    
    if (sortBy === 'name') {
      return a.fund.name.localeCompare(b.fund.name);
    } else if (sortBy === 'returns') {
      return b.fund.returns.oneYear - a.fund.returns.oneYear;
    } else if (sortBy === 'category') {
      return a.fund.category.localeCompare(b.fund.category);
    }
    
    // Default sort by date added
    return b.addedDate.getTime() - a.addedDate.getTime();
  });
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };
  
  const handleRemoveFromWatchlist = (id: string) => {
    setSelectedItem(id);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmRemove = () => {
    toast({
      title: "Removed from Watchlist",
      description: "Fund has been removed from your watchlist.",
    });
    setIsDeleteDialogOpen(false);
  };
  
  // Function to handle adding to watchlist (in a real app, this would interact with a database)
  const handleAddToWatchlist = (fund: MutualFund) => {
    toast({
      title: "Added to Watchlist",
      description: `${fund.name} has been added to your watchlist.`,
    });
    setIsAddDialogOpen(false);
  };

  return (
    <PageContainer title="My Watchlist">
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-500">Track funds you're interested in</p>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              size="sm"
              className="bg-fundeasy-green hover:bg-fundeasy-dark-green"
            >
              <Plus size={16} className="mr-1" /> Add Fund
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add to Watchlist</DialogTitle>
            </DialogHeader>
            <div className="mt-2">
              <Input
                placeholder="Search funds..."
                className="mb-4"
              />
              
              <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1">
                {mockMutualFunds
                  .filter(fund => !mockWatchlist.some(item => item.fundId === fund.id))
                  .slice(0, 10)
                  .map(fund => (
                    <Card 
                      key={fund.id} 
                      className="hover:bg-gray-50 transition cursor-pointer"
                      onClick={() => handleAddToWatchlist(fund)}
                    >
                      <CardContent className="p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-sm">{fund.name}</p>
                            <div className="flex items-center mt-1">
                              <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{fund.category}</span>
                              <span className="text-xs ml-2">{fund.risk} Risk</span>
                            </div>
                          </div>
                          <div className="flex items-center text-fundeasy-green">
                            <TrendingUp size={14} className="mr-0.5" />
                            <span className="text-sm">{fund.returns.oneYear}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="mb-4 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search watchlist..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortBy('date')}>
              Sort by Date Added
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('name')}>
              Sort by Name
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('returns')}>
              Sort by Returns
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy('category')}>
              Sort by Category
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Watchlist */}
      <div className="space-y-4 mb-20">
        {sortedWatchlist.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Star size={40} className="text-gray-300 mx-auto mb-4" />
            {searchQuery ? (
              <>
                <p className="text-gray-500 mb-2">No matching funds found</p>
                <p className="text-xs text-gray-400 mb-4">Try a different search term</p>
              </>
            ) : (
              <>
                <p className="text-gray-500 mb-2">Your watchlist is empty</p>
                <p className="text-xs text-gray-400 mb-4">Add funds to track their performance</p>
              </>
            )}
            
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-fundeasy-green hover:bg-fundeasy-dark-green"
            >
              <Plus size={16} className="mr-1" /> Add Fund
            </Button>
          </div>
        ) : (
          sortedWatchlist.map(item => {
            if (!item.fund) return null;
            
            const isPositiveReturn = item.fund.returns.oneYear >= 0;
            
            return (
              <Card 
                key={item.id} 
                className="hover:shadow-md transition"
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <div 
                      className="cursor-pointer flex-1"
                      onClick={() => navigate(`/fund/${item.fund?.id}`)}
                    >
                      <div className="flex items-center">
                        <h3 className="font-medium">{item.fund.name}</h3>
                        <span className="ml-2 text-xs px-2 py-0.5 bg-gray-100 rounded">
                          {item.fund.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <p className="text-xs text-gray-500">NAV</p>
                          <p className="font-medium">₹{item.fund.navValue.toFixed(2)}</p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-xs text-gray-500">1Y Returns</p>
                          <div className={`flex items-center ${isPositiveReturn ? 'text-fundeasy-green' : 'text-red-500'}`}>
                            {isPositiveReturn ? (
                              <TrendingUp size={14} className="mr-0.5" />
                            ) : (
                              <TrendingDown size={14} className="mr-0.5" />
                            )}
                            <p className="font-medium">{item.fund.returns.oneYear}%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                      onClick={() => handleRemoveFromWatchlist(item.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  
                  {item.notes && (
                    <div className="mt-3 pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-500">Note: {item.notes}</p>
                    </div>
                  )}
                  
                  <div className="text-right mt-2">
                    <p className="text-xs text-gray-400">Added: {formatDate(item.addedDate)}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove from Watchlist</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this fund from your watchlist?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemove} className="bg-red-500 hover:bg-red-600">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageContainer>
  );
};

export default Watchlist;
