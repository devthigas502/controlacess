'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { DashboardLayout } from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Users, 
  AlertTriangle, 
  Activity,
  Clock,
  MapPin,
  TrendingUp,
  Lock,
  Download,
  Eye,
  RefreshCw,
  BarChart3,
  Monitor
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// Mock data para demonstração
const mockData = {
  stats: {
    totalUsers: 1247,
    usersInside: 342,
    activeAlerts: 3,
    todayAccess: 89
  },
  recentAccess: [
    { id: 1, user: 'João Silva', location: 'Portaria Principal', time: '14:32', status: 'allowed' },
    { id: 2, user: 'Maria Santos', location: 'Sala de Reunião A', time: '14:28', status: 'allowed' },
    { id: 3, user: 'Pedro Costa', location: 'Data Center', time: '14:25', status: 'denied' },
    { id: 4, user: 'Ana Oliveira', location: 'RH - 2º Andar', time: '14:20', status: 'allowed' },
    { id: 5, user: 'Carlos Lima', location: 'Laboratório', time: '14:15', status: 'allowed' }
  ],
  realTimeAccess: [
    { id: 1, user: 'João Silva', location: 'Portaria Principal', action: 'entrada', time: '14:35:22', badge: 'C001', device: 'Catraca 01', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
    { id: 3, user: 'Pedro Costa', location: 'Data Center', action: 'saida', time: '14:33:45', badge: 'C003', device: 'Leitor Biométrico', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
    { id: 4, user: 'Ana Oliveira', location: 'RH - 2º Andar', action: 'entrada', time: '14:32:30', badge: 'C004', device: 'Catraca 02', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
    { id: 5, user: 'Carlos Lima', location: 'Laboratório', action: 'saida', time: '14:31:12', badge: 'C005', device: 'Porta Eletrônica B', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' },
    { id: 6, user: 'Fernanda Alves', location: 'Garagem', action: 'entrada', time: '14:30:55', badge: 'C006', device: 'Catraca 03', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face' },
    { id: 7, user: 'Roberto Santos', location: 'Portaria Lateral', action: 'entrada', time: '14:29:40', badge: 'P001', device: 'Leitor RFID', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face' },
    { id: 8, user: 'Juliana Costa', location: 'Sala de TI', action: 'saida', time: '14:28:25', badge: 'C007', device: 'Porta Eletrônica C', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face' }
  ],
  alerts: [
    { id: 1, message: 'Tentativa de acesso não autorizado - Data Center', time: '14:25', severity: 'high' },
    { id: 2, message: 'Porta aberta por mais de 5 minutos - Sala 201', time: '13:45', severity: 'medium' },
    { id: 3, message: 'Falha de comunicação - Catraca 03', time: '12:30', severity: 'low' }
  ]
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Visão geral do sistema de controle de acesso</p>
        </div>

        {/* Abas de Navegação */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BarChart3 className="h-5 w-5 inline mr-2" />
              Visão Geral
            </button>
            <button
              onClick={() => setActiveTab('monitoring')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'monitoring'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Eye className="h-5 w-5 inline mr-2" />
              Monitoramento
            </button>
          </nav>
        </div>

        {/* Conteúdo das Abas */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Cards de estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Colaboradores</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockData.stats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +12% em relação ao mês passado
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Logins</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.259</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +20% em relação ao mês passado
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pessoas no Local</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600 ">{mockData.stats.usersInside}</div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Capacidade atual: 68%
                  </p>
                  <Button size="sm">Extrair relatório <Download /> </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Alertas Ativos</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{mockData.stats.activeAlerts}</div>
                  <p className="text-xs text-muted-foreground">
                    2 críticos, 1 moderado
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Acessos Hoje</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockData.stats.todayAccess}</div>
                  <p className="text-xs text-muted-foreground">
                    <Clock className="inline h-3 w-3 mr-1" />
                    Último há 5 minutos
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Acessos Recentes */}
              <Card>
                <CardHeader>
                  <CardTitle>Acessos Recentes</CardTitle>
                  <CardDescription>Últimos registros de entrada e saída</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.recentAccess.map((access) => (
                      <div key={access.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-3 last:border-b-0 space-y-2 sm:space-y-0">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            access.status === 'allowed' ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm truncate">{access.user}</p>
                            <p className="text-xs text-gray-500 truncate">{access.location}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 sm:ml-4">
                          <p className="text-sm">{access.time}</p>
                          <p className={`text-xs ${
                            access.status === 'allowed' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {access.status === 'allowed' ? 'Permitido' : 'Negado'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Alertas Ativos */}
              <Card>
                <CardHeader>
                  <CardTitle>Alertas Ativos</CardTitle>
                  <CardDescription>Notificações que requerem atenção</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.alerts.map((alert) => (
                      <div key={alert.id} className="flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 border-b pb-3 last:border-b-0">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          alert.severity === 'high' ? 'bg-red-500' : 
                          alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                        </div>
                        <button className="text-xs text-blue-600 hover:text-blue-800 self-start sm:mt-2">
                          Resolver
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mapa de Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status dos Dispositivos</CardTitle>
                <CardDescription>Monitoramento em tempo real dos pontos de acesso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[
                    { name: 'Portaria Principal', status: 'online', type: 'catraca' },
                    { name: 'Entrada Lateral', status: 'online', type: 'catraca' },
                    { name: 'Data Center', status: 'offline', type: 'porta' },
                    { name: 'Sala de Reunião A', status: 'online', type: 'porta' },
                    { name: 'Laboratório', status: 'warning', type: 'porta' },
                    { name: 'RH - 2º Andar', status: 'online', type: 'porta' },
                    { name: 'Garagem', status: 'online', type: 'catraca' },
                    { name: 'Terraço', status: 'online', type: 'porta' }
                  ].map((device, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <Lock className="h-4 w-4 text-gray-400" />
                        <div className={`w-2 h-2 rounded-full ${
                          device.status === 'online' ? 'bg-green-500' : 
                          device.status === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}></div>
                      </div>
                      <p className="text-sm font-medium">{device.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{device.type}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'monitoring' && (
          <div className="space-y-6">
            {/* Monitoramento em Tempo Real */}
            <Card>
              <CardHeader>
                <CardTitle>Monitoramento em Tempo Real</CardTitle>
                <CardDescription>Acompanhamento instantâneo de todas as entradas e saídas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-800 text-sm uppercase tracking-wide">Foto</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-800 text-sm uppercase tracking-wide">Pessoa</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-800 text-sm uppercase tracking-wide">Local</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-800 text-sm uppercase tracking-wide">Dispositivo</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-800 text-sm uppercase tracking-wide">Ação</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-800 text-sm uppercase tracking-wide">Horário</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {mockData.realTimeAccess.map((access) => (
                        <tr key={access.id} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="py-4 px-4">
                            <Image 
                              src={access.avatar} 
                              alt={`Foto de ${access.user}`}
                              width={40}
                              height={40}
                              className="rounded-full object-cover shadow-sm border border-gray-200"
                            />
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-semibold text-gray-900 text-sm">{access.user}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm text-gray-600 flex items-center gap-2">
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              {access.location}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-sm text-gray-600 flex items-center gap-2">
                              <Monitor className="h-4 w-4 text-gray-400" />
                              {access.device}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              access.action === 'entrada' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {access.action === 'entrada' ? 'Entrada' : 'Saída'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className="text-sm font-medium text-gray-900">
                              {access.time}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <RefreshCw className="h-4 w-4" />
                        <span>Atualizado há 8 segundos</span>
                      </div>
                      <div className="h-4 w-px bg-gray-300"></div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-gray-700">4 Entradas</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium text-gray-700">4 Saídas</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-700 font-medium">
                      <Activity className="h-4 w-4" />
                      Sistema Online
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}