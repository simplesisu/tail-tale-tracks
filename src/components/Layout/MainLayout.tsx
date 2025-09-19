import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { useUIStore } from '@/stores/uiStore';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { sidebarCollapsed } = useUIStore();

  const contentVariants = {
    expanded: { marginLeft: '280px' },
    collapsed: { marginLeft: '80px' }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <motion.main
        initial={false}
        animate={sidebarCollapsed ? 'collapsed' : 'expanded'}
        variants={contentVariants}
        className={cn(
          'transition-all duration-300 min-h-screen',
          'p-6 lg:p-8'
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-7xl mx-auto"
        >
          {children}
        </motion.div>
      </motion.main>
    </div>
  );
};