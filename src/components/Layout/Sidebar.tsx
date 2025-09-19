import { motion } from 'framer-motion';
import { 
  Home, 
  Heart, 
  Calendar, 
  FileText, 
  Camera, 
  Shield, 
  Settings, 
  Menu,
  PawPrint
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/stores/uiStore';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { icon: Home, label: 'Dashboard', href: '/', color: 'text-primary' },
  { icon: Heart, label: 'My Pets', href: '/pets', color: 'text-secondary' },
  { icon: Calendar, label: 'Appointments', href: '/appointments', color: 'text-success' },
  { icon: FileText, label: 'Documents', href: '/documents', color: 'text-warning' },
  { icon: Camera, label: 'Photos', href: '/photos', color: 'text-secondary' },
  { icon: Shield, label: 'Insurance', href: '/insurance', color: 'text-primary' },
];

export const Sidebar = () => {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const location = useLocation();

  const sidebarVariants = {
    expanded: { width: '280px' },
    collapsed: { width: '80px' }
  };

  const textVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -20 }
  };

  return (
    <motion.aside
      initial={false}
      animate={sidebarCollapsed ? 'collapsed' : 'expanded'}
      variants={sidebarVariants}
      className="fixed left-0 top-0 z-50 h-full bg-gradient-card shadow-card border-r border-border"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <motion.div
            animate={sidebarCollapsed ? 'collapsed' : 'expanded'}
            variants={textVariants}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-lg font-bold text-foreground">PetCare</h1>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            )}
          </motion.div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="h-8 w-8 p-0"
          >
            <Menu className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-full justify-start gap-3 h-12 text-left transition-all duration-200',
                      isActive
                        ? 'bg-primary/10 text-primary border-l-4 border-primary'
                        : 'hover:bg-accent text-muted-foreground hover:text-foreground',
                      sidebarCollapsed && 'justify-center'
                    )}
                  >
                    <Icon className={cn('w-5 h-5 flex-shrink-0', item.color)} />
                    <motion.span
                      animate={sidebarCollapsed ? 'collapsed' : 'expanded'}
                      variants={textVariants}
                      className="font-medium"
                    >
                      {item.label}
                    </motion.span>
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start gap-3 h-12 text-muted-foreground hover:text-foreground',
              sidebarCollapsed && 'justify-center'
            )}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            <motion.span
              animate={sidebarCollapsed ? 'collapsed' : 'expanded'}
              variants={textVariants}
            >
              Settings
            </motion.span>
          </Button>
        </div>
      </div>
    </motion.aside>
  );
};