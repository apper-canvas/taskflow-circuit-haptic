import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import { routes } from '@/config/routes'
import QuickAddModal from '@/components/organisms/QuickAddModal'
import ProgressRing from '@/components/atoms/ProgressRing'
import { AuthContext } from '@/App'
function Layout() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  // Get authentication state and methods
  const { user } = useSelector((state) => state.user)
  const { logout } = useContext(AuthContext)

  // Mock progress for demonstration
  const completedToday = 8
  const totalToday = 12
  const progressPercentage = Math.round((completedToday / totalToday) * 100)

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="flex-shrink-0 h-16 bg-white border-b border-surface-200 px-4 md:px-6 z-40">
        <div className="h-full flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 hover:bg-surface-100 rounded-button transition-colors"
            >
              <ApperIcon name="Menu" size={20} />
            </button>
            
            {/* Logo and title */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                <ApperIcon name="CheckSquare" size={18} className="text-white" />
              </div>
              <h1 className="font-display font-bold text-xl text-surface-900 hidden sm:block">
                TaskFlow
              </h1>
            </div>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <ApperIcon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" 
              />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-surface-200 rounded-button focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

{/* Right side */}
          <div className="flex items-center gap-3">
            {/* Progress ring */}
            <div className="hidden sm:flex items-center gap-2">
              <ProgressRing progress={progressPercentage} size={32} />
              <span className="text-sm font-medium text-surface-600">
                {completedToday}/{totalToday}
              </span>
            </div>

            {/* User info and logout */}
            {user && (
              <div className="hidden md:flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-surface-900">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-xs text-surface-600">
                    {user.emailAddress}
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="p-2 hover:bg-surface-100 rounded-button transition-colors text-surface-600 hover:text-surface-900"
                  title="Logout"
                >
                  <ApperIcon name="LogOut" size={18} />
                </button>
              </div>
            )}

            {/* Quick add button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsQuickAddOpen(true)}
              className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-button font-medium flex items-center gap-2 shadow-button transition-colors"
            >
              <ApperIcon name="Plus" size={16} />
              <span className="hidden sm:inline">Add Task</span>
            </motion.button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 bg-white border-r border-surface-200 overflow-y-auto z-40">
          <nav className="p-4 space-y-2">
            {Object.values(routes).map((route) => (
              <NavLink
                key={route.id}
                to={route.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-button'
                      : 'text-surface-700 hover:bg-surface-100 hover:text-surface-900'
                  }`
                }
              >
                <ApperIcon name={route.icon} size={18} />
                {route.label}
              </NavLink>
            ))}
          </nav>

          {/* Sidebar footer with stats */}
          <div className="p-4 border-t border-surface-200 mt-8">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-surface-600">Today's Progress</span>
                <span className="font-medium text-surface-900">{progressPercentage}%</span>
              </div>
              <div className="bg-surface-100 rounded-full h-2">
                <motion.div
                  className="bg-primary h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className="fixed left-0 top-0 bottom-0 w-64 bg-white z-50 md:hidden"
              >
                <div className="p-4 border-b border-surface-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                        <ApperIcon name="CheckSquare" size={18} className="text-white" />
                      </div>
                      <h1 className="font-display font-bold text-xl text-surface-900">
                        TaskFlow
                      </h1>
                    </div>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 hover:bg-surface-100 rounded-button transition-colors"
                    >
                      <ApperIcon name="X" size={20} />
                    </button>
                  </div>
                </div>
                
                <nav className="p-4 space-y-2">
                  {Object.values(routes).map((route) => (
                    <NavLink
                      key={route.id}
                      to={route.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all ${
                          isActive
                            ? 'bg-primary text-white shadow-button'
                            : 'text-surface-700 hover:bg-surface-100 hover:text-surface-900'
                        }`
                      }
                    >
                      <ApperIcon name={route.icon} size={18} />
                      {route.label}
                    </NavLink>
                  ))}
                </nav>

                {/* Mobile search */}
                <div className="p-4 border-t border-surface-200">
                  <div className="relative">
                    <ApperIcon 
                      name="Search" 
                      size={16} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" 
                    />
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-surface-200 rounded-button focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <Outlet context={{ searchQuery, setSearchQuery }} />
          </motion.div>
        </main>
      </div>

      {/* Quick Add Modal */}
      <QuickAddModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
      />
    </div>
  )
}

export default Layout