
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, ArrowRight, Check, AlertCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { format, addMonths, isBefore } from 'date-fns';

interface SIPStatusCardProps {
  sipId: string;
  fundName: string;
  amount: number;
  startDate: Date;
  nextDate?: Date;
  status: 'active' | 'pending' | 'paused' | 'completed';
  installmentsCompleted?: number;
  totalInstallments?: number;
}

const SIPStatusCard: React.FC<SIPStatusCardProps> = ({
  sipId,
  fundName,
  amount,
  startDate,
  nextDate = addMonths(new Date(), 1),
  status = 'active',
  installmentsCompleted = 0,
  totalInstallments = 0
}) => {
  const navigate = useNavigate();
  
  const getStatusDetails = () => {
    switch (status) {
      case 'active':
        return {
          label: 'Active',
          color: 'bg-fundeasy-green text-white',
          icon: Check,
          message: `Next payment on ${format(nextDate, 'dd MMM yyyy')}`
        };
      case 'pending':
        return {
          label: 'Pending',
          color: 'bg-amber-100 text-amber-800',
          icon: Clock,
          message: 'Awaiting confirmation'
        };
      case 'paused':
        return {
          label: 'Paused',
          color: 'bg-gray-100 text-gray-600',
          icon: AlertCircle,
          message: 'SIP payments are paused'
        };
      case 'completed':
        return {
          label: 'Completed',
          color: 'bg-blue-100 text-blue-700',
          icon: Check,
          message: `Completed on ${format(nextDate, 'dd MMM yyyy')}`
        };
      default:
        return {
          label: 'Active',
          color: 'bg-fundeasy-green text-white',
          icon: Check,
          message: `Next payment on ${format(nextDate, 'dd MMM yyyy')}`
        };
    }
  };
  
  const statusDetails = getStatusDetails();
  const progress = totalInstallments > 0 ? (installmentsCompleted / totalInstallments) * 100 : 0;
  
  return (
    <Card className="overflow-hidden border border-gray-100 hover:border-fundeasy-green/50 hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold line-clamp-1">{fundName}</h3>
            <div className="flex items-center gap-1.5 mt-1">
              <Badge className={`${statusDetails.color}`}>
                <statusDetails.icon size={12} className="mr-1" />
                {statusDetails.label}
              </Badge>
              <p className="text-xs text-gray-500">{statusDetails.message}</p>
            </div>
          </div>
          <p className="font-semibold text-fundeasy-green">₹{amount.toLocaleString()}</p>
        </div>
        
        {totalInstallments > 0 && (
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500">Progress</span>
              <span className="text-fundeasy-dark-gray font-medium">
                {installmentsCompleted}/{totalInstallments} installments
              </span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}
        
        <div className="flex justify-between mt-3 pt-2 border-t border-gray-100">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs h-8 px-2 text-gray-500"
            onClick={() => navigate(`/sip-dashboard`)}
          >
            <Calendar size={14} className="mr-1" />
            Started {format(startDate, 'dd MMM yyyy')}
          </Button>
          
          <Button 
            variant="ghost"
            size="sm"
            className="text-xs h-8 px-2 text-fundeasy-blue hover:text-fundeasy-blue hover:bg-fundeasy-blue/10"
            onClick={() => navigate(`/manage-sip/${sipId}`)}
          >
            Manage
            <ArrowRight size={14} className="ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SIPStatusCard;
