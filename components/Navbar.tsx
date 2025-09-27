'use client'

import React from 'react'
import { Bell, Search, User, Menu } from 'lucide-react'

interface NavbarProps {
  className?: string
  onSidebarToggle?: () => void
}

export function Navbar({ className, onSidebarToggle }: NavbarProps) {
  return (
    <nav className={`bg-white shadow-sm border-b border-gray-200 ${className}`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={onSidebarToggle}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-shrink-0 ml-4 lg:ml-0">
              <h1 className="text-lg font-semibold text-gray-900 hidden sm:block">
                Sistema de Controle de Acesso
              </h1>
              <h1 className="text-base font-semibold text-gray-900 sm:hidden">
                ControlAcess
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Buscar..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <button className="md:hidden p-2 text-gray-400 hover:text-gray-500">
              <Search className="h-5 w-5" />
            </button>
            
            <button className="relative p-2 text-gray-400 hover:text-gray-500">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="min-w-0 flex-1 hidden sm:block">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Admin User
                </p>
                <p className="text-sm text-gray-500 truncate">
                  admin@controlacess.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}