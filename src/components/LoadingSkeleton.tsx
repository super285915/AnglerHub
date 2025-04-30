import React from 'react';
import { Box, Skeleton, Paper, useTheme, useMediaQuery } from '@mui/material';

interface LoadingSkeletonProps {
  type: 'card' | 'list' | 'detail' | 'form' | 'table';
  count?: number;
  height?: number | string;
  width?: number | string;
  variant?: 'text' | 'rectangular' | 'circular';
  animation?: 'pulse' | 'wave' | false;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type,
  count = 1,
  height,
  width = '100%',
  variant = 'rectangular',
  animation = 'wave',
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const renderCardSkeleton = () => (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        borderRadius: 2,
        overflow: 'hidden',
        height: height || 'auto',
        width: width,
      }}
    >
      <Skeleton variant="rectangular" width="100%" height={140} animation={animation} />
      <Skeleton variant="text" width="70%" height={32} animation={animation} sx={{ mt: 2 }} />
      <Skeleton variant="text" width="40%" height={20} animation={animation} sx={{ mb: 1.5 }} />
      <Skeleton variant="text" width="100%" height={20} animation={animation} />
      <Skeleton variant="text" width="100%" height={20} animation={animation} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Skeleton variant="rectangular" width="30%" height={36} animation={animation} />
        <Skeleton variant="circular" width={36} height={36} animation={animation} />
      </Box>
    </Paper>
  );
  
  const renderListSkeleton = () => (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        borderRadius: 2,
        overflow: 'hidden',
        height: height || 'auto',
        width: width,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Skeleton variant="circular" width={40} height={40} animation={animation} sx={{ mr: 2 }} />
        <Box sx={{ width: '100%' }}>
          <Skeleton variant="text" width="60%" height={24} animation={animation} />
          <Skeleton variant="text" width="40%" height={20} animation={animation} />
        </Box>
      </Box>
      <Skeleton variant="rectangular" width="100%" height={1} animation={animation} sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Skeleton variant="circular" width={40} height={40} animation={animation} sx={{ mr: 2 }} />
        <Box sx={{ width: '100%' }}>
          <Skeleton variant="text" width="70%" height={24} animation={animation} />
          <Skeleton variant="text" width="50%" height={20} animation={animation} />
        </Box>
      </Box>
      <Skeleton variant="rectangular" width="100%" height={1} animation={animation} sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Skeleton variant="circular" width={40} height={40} animation={animation} sx={{ mr: 2 }} />
        <Box sx={{ width: '100%' }}>
          <Skeleton variant="text" width="65%" height={24} animation={animation} />
          <Skeleton variant="text" width="45%" height={20} animation={animation} />
        </Box>
      </Box>
    </Paper>
  );
  
  const renderDetailSkeleton = () => (
    <Paper
      elevation={1}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        height: height || 'auto',
        width: width,
      }}
    >
      <Skeleton variant="rectangular" width="100%" height={250} animation={animation} />
      <Box sx={{ p: 3 }}>
        <Skeleton variant="text" width="80%" height={40} animation={animation} sx={{ mb: 1 }} />
        <Box sx={{ display: 'flex', mb: 3 }}>
          <Skeleton variant="text" width="30%" height={24} animation={animation} sx={{ mr: 2 }} />
          <Skeleton variant="text" width="20%" height={24} animation={animation} />
        </Box>
        <Skeleton variant="text" width="100%" height={20} animation={animation} />
        <Skeleton variant="text" width="100%" height={20} animation={animation} />
        <Skeleton variant="text" width="100%" height={20} animation={animation} />
        <Skeleton variant="text" width="90%" height={20} animation={animation} sx={{ mb: 3 }} />
        
        <Skeleton variant="text" width="40%" height={30} animation={animation} sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          <Skeleton variant="rectangular" width={80} height={32} animation={animation} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={100} height={32} animation={animation} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={90} height={32} animation={animation} sx={{ borderRadius: 1 }} />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Skeleton variant="rectangular" width="48%" height={50} animation={animation} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width="48%" height={50} animation={animation} sx={{ borderRadius: 1 }} />
        </Box>
      </Box>
    </Paper>
  );
  
  const renderFormSkeleton = () => (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        borderRadius: 2,
        overflow: 'hidden',
        height: height || 'auto',
        width: width,
      }}
    >
      <Skeleton variant="text" width="60%" height={40} animation={animation} sx={{ mb: 3 }} />
      <Skeleton variant="rectangular" width="100%" height={56} animation={animation} sx={{ mb: 2, borderRadius: 1 }} />
      <Skeleton variant="rectangular" width="100%" height={56} animation={animation} sx={{ mb: 2, borderRadius: 1 }} />
      <Skeleton variant="rectangular" width="100%" height={56} animation={animation} sx={{ mb: 2, borderRadius: 1 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Skeleton variant="text" width="30%" height={20} animation={animation} />
      </Box>
      
      <Skeleton variant="rectangular" width="100%" height={56} animation={animation} sx={{ mb: 3, borderRadius: 1 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Skeleton variant="rectangular" width="30%" height={40} animation={animation} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" width="30%" height={40} animation={animation} sx={{ borderRadius: 1 }} />
      </Box>
    </Paper>
  );
  
  const renderTableSkeleton = () => (
    <Paper
      elevation={1}
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        height: height || 'auto',
        width: width,
      }}
    >
      <Box sx={{ p: 2, bgcolor: 'rgba(0, 0, 0, 0.03)' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Skeleton variant="text" width="30%" height={32} animation={animation} />
          <Skeleton variant="rectangular" width={120} height={40} animation={animation} sx={{ borderRadius: 1 }} />
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', p: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
        <Skeleton variant="text" width="5%" height={24} animation={animation} sx={{ mr: 2 }} />
        <Skeleton variant="text" width="30%" height={24} animation={animation} sx={{ mr: 2 }} />
        <Skeleton variant="text" width="20%" height={24} animation={animation} sx={{ mr: 2 }} />
        <Skeleton variant="text" width="15%" height={24} animation={animation} sx={{ mr: 2 }} />
        <Skeleton variant="text" width="15%" height={24} animation={animation} />
      </Box>
      
      {Array.from(new Array(5)).map((_, index) => (
        <Box key={index} sx={{ display: 'flex', p: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
          <Skeleton variant="text" width="5%" height={24} animation={animation} sx={{ mr: 2 }} />
          <Skeleton variant="text" width="30%" height={24} animation={animation} sx={{ mr: 2 }} />
          <Skeleton variant="text" width="20%" height={24} animation={animation} sx={{ mr: 2 }} />
          <Skeleton variant="text" width="15%" height={24} animation={animation} sx={{ mr: 2 }} />
          <Skeleton variant="text" width="15%" height={24} animation={animation} />
        </Box>
      ))}
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <Skeleton variant="rectangular" width={200} height={36} animation={animation} sx={{ borderRadius: 1 }} />
      </Box>
    </Paper>
  );
  
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return renderCardSkeleton();
      case 'list':
        return renderListSkeleton();
      case 'detail':
        return renderDetailSkeleton();
      case 'form':
        return renderFormSkeleton();
      case 'table':
        return renderTableSkeleton();
      default:
        return renderCardSkeleton();
    }
  };
  
  return (
    <>
      {Array.from(new Array(count)).map((_, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          {renderSkeleton()}
        </Box>
      ))}
    </>
  );
};

export default LoadingSkeleton;
