import { useState, useEffect } from 'react'
import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface NavItem {
  name: string
  href: string
  description: string
}

interface MobileMenuProps {
  isOpen: boolean
  navItems: NavItem[]
  onClose: () => void
}

export function MobileMenu({ isOpen, navItems, onClose }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '-100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 bg-white"
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 focus:outline-hidden"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grow flex flex-col justify-center items-center space-y-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-2xl font-medium text-gray-900 hover:text-primary"
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              ))}
              <div className="text-2xl font-medium text-gray-900 hover:text-primary">More</div>
              <div className="space-y-4 text-center">
                <Link
                  href="/help"
                  className="block text-lg text-gray-600 hover:text-primary"
                  onClick={onClose}
                >
                  Help Center
                </Link>
                <Link
                  href="/blog"
                  className="block text-lg text-gray-600 hover:text-primary"
                  onClick={onClose}
                >
                  Blog
                </Link>
                <Link
                  href="/community"
                  className="block text-lg text-gray-600 hover:text-primary"
                  onClick={onClose}
                >
                  Community
                </Link>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center justify-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <div className="text-lg font-medium text-gray-900">John Doe</div>
                  <div className="text-sm text-gray-500">john@example.com</div>
                </div>
              </div>
              <div className="flex justify-center space-x-4">
                <Link
                  href="/profile"
                  className="text-gray-600 hover:text-primary"
                  onClick={onClose}
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="text-gray-600 hover:text-primary"
                  onClick={onClose}
                >
                  Settings
                </Link>
                <button
                  className="flex items-center text-red-600 hover:text-red-800"
                  onClick={onClose}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

