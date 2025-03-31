
// Mock mutual fund data
export interface MutualFund {
  id: string;
  name: string;
  category: 'Equity' | 'Debt' | 'Hybrid';
  risk: 'Low' | 'Moderate' | 'High';
  navValue: number;
  expenseRatio: number;
  returns: {
    oneYear: number;
    threeYear: number;
    fiveYear: number;
  };
  aum: number; // Assets Under Management in crores
  fundManager: string;
  description: string;
}

export const mockMutualFunds: MutualFund[] = [
  {
    id: "fund1",
    name: "Axis Bluechip Fund",
    category: "Equity",
    risk: "Moderate",
    navValue: 45.67,
    expenseRatio: 0.78,
    returns: {
      oneYear: 12.4,
      threeYear: 15.2,
      fiveYear: 11.8
    },
    aum: 2345,
    fundManager: "Shreyash Devalkar",
    description: "A large cap fund investing in blue chip companies with a history of strong performance and stability."
  },
  {
    id: "fund2",
    name: "SBI Small Cap Fund",
    category: "Equity",
    risk: "High",
    navValue: 78.21,
    expenseRatio: 0.92,
    returns: {
      oneYear: 18.7,
      threeYear: 22.1,
      fiveYear: 16.9
    },
    aum: 1567,
    fundManager: "R. Srinivasan",
    description: "A small cap fund that aims to identify potential future leaders in the small cap space for long-term growth."
  },
  {
    id: "fund3",
    name: "HDFC Corporate Bond Fund",
    category: "Debt",
    risk: "Low",
    navValue: 25.34,
    expenseRatio: 0.45,
    returns: {
      oneYear: 6.8,
      threeYear: 7.9,
      fiveYear: 8.1
    },
    aum: 4526,
    fundManager: "Anil Bamboli",
    description: "A debt fund focusing on corporate bonds with high credit quality for stable returns."
  },
  {
    id: "fund4",
    name: "ICICI Prudential Value Discovery Fund",
    category: "Equity",
    risk: "Moderate",
    navValue: 115.67,
    expenseRatio: 0.85,
    returns: {
      oneYear: 15.2,
      threeYear: 14.8,
      fiveYear: 12.3
    },
    aum: 3421,
    fundManager: "Sankaran Naren",
    description: "A value-oriented equity fund that invests in undervalued companies with strong fundamentals."
  },
  {
    id: "fund5",
    name: "Kotak Balanced Advantage Fund",
    category: "Hybrid",
    risk: "Moderate",
    navValue: 35.45,
    expenseRatio: 0.72,
    returns: {
      oneYear: 10.5,
      threeYear: 13.2,
      fiveYear: 11.5
    },
    aum: 2189,
    fundManager: "Harish Krishnan",
    description: "A dynamic asset allocation fund that balances between equity and debt based on market conditions."
  },
  {
    id: "fund6",
    name: "Nippon India Liquid Fund",
    category: "Debt",
    risk: "Low",
    navValue: 4892.37,
    expenseRatio: 0.18,
    returns: {
      oneYear: 3.9,
      threeYear: 4.8,
      fiveYear: 5.2
    },
    aum: 7834,
    fundManager: "Vivek Sharma",
    description: "A liquid fund providing high liquidity and capital preservation with modest returns."
  },
  {
    id: "fund7",
    name: "Mirae Asset Emerging Bluechip Fund",
    category: "Equity",
    risk: "High",
    navValue: 87.56,
    expenseRatio: 0.89,
    returns: {
      oneYear: 17.8,
      threeYear: 21.3,
      fiveYear: 18.6
    },
    aum: 2873,
    fundManager: "Neelesh Surana",
    description: "A fund focusing on emerging large-cap and established mid-cap companies with growth potential."
  },
  {
    id: "fund8",
    name: "Aditya Birla Sunlife Tax Relief 96",
    category: "Equity",
    risk: "Moderate",
    navValue: 62.34,
    expenseRatio: 0.81,
    returns: {
      oneYear: 14.6,
      threeYear: 16.7,
      fiveYear: 13.8
    },
    aum: 1975,
    fundManager: "Ajay Garg",
    description: "An ELSS fund offering tax benefits under Section 80C with potential for long-term capital appreciation."
  }
];

// Mock user investment data
export interface UserInvestment {
  id: string;
  fundId: string;
  investmentType: 'SIP' | 'One-time';
  amount: number;
  units: number;
  investmentDate: string;
  sipDetails?: {
    frequency: 'Monthly' | 'Quarterly';
    nextDate: string;
  };
  currentValue?: number;
}

export const mockUserInvestments: UserInvestment[] = [
  {
    id: "inv1",
    fundId: "fund1",
    investmentType: "SIP",
    amount: 5000,
    units: 109.48,
    investmentDate: "2023-01-15",
    sipDetails: {
      frequency: "Monthly",
      nextDate: "2023-06-15"
    },
    currentValue: 5320
  },
  {
    id: "inv2",
    fundId: "fund3",
    investmentType: "One-time",
    amount: 20000,
    units: 789.27,
    investmentDate: "2022-11-05",
    currentValue: 21450
  },
  {
    id: "inv3",
    fundId: "fund5",
    investmentType: "SIP",
    amount: 3000,
    units: 84.63,
    investmentDate: "2023-02-20",
    sipDetails: {
      frequency: "Monthly",
      nextDate: "2023-06-20"
    },
    currentValue: 3180
  }
];

// Mock market news
export interface MarketNews {
  id: string;
  headline: string;
  summary: string;
  date: string;
}

export const mockMarketNews: MarketNews[] = [
  {
    id: "news1",
    headline: "Sensex hits all-time high",
    summary: "Indian market indices reached new heights as foreign investors increased their positions.",
    date: "2023-05-28"
  },
  {
    id: "news2",
    headline: "RBI keeps repo rate unchanged",
    summary: "The central bank maintains interest rates steady in its latest monetary policy meeting.",
    date: "2023-05-25"
  },
  {
    id: "news3",
    headline: "IT sector shows strong earnings",
    summary: "Major IT companies reported better than expected Q1 results, boosting market sentiment.",
    date: "2023-05-22"
  }
];

// Calculation utilities
export const calculateTotalInvestment = (investments: UserInvestment[]): number => {
  return investments.reduce((total, inv) => total + inv.amount, 0);
};

export const calculateCurrentValue = (investments: UserInvestment[]): number => {
  return investments.reduce((total, inv) => total + (inv.currentValue || inv.amount), 0);
};

export const calculateReturns = (totalInvestment: number, currentValue: number): number => {
  if (totalInvestment === 0) return 0;
  return ((currentValue - totalInvestment) / totalInvestment) * 100;
};

// SIP Calculator
export const calculateSIPReturns = (
  monthlyInvestment: number,
  years: number,
  expectedReturnRate: number
): number => {
  const monthlyRate = expectedReturnRate / 12 / 100;
  const months = years * 12;
  
  const futureValue = 
    monthlyInvestment * 
    (Math.pow(1 + monthlyRate, months) - 1) * 
    (1 + monthlyRate) / 
    monthlyRate;
  
  return Math.round(futureValue);
};
