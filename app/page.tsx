'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Verifica se há token de autenticação
    const token = localStorage.getItem('auth_token')
    
    if (token) {
      // Se há token, redireciona para dashboard
      router.push('/dashboard')
    } else {
      // Se não há token, redireciona para login
      router.push('/login')
    }
  }, [router])

  // Tela de carregamento enquanto redireciona
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600">Carregando ControlAcess...</p>
      </div>
    </div>
  )
}