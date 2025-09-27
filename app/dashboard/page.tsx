'use client'

import React from 'react'
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
  Download
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
  alerts: [
    { id: 1, message: 'Tentativa de acesso não autorizado - Data Center', time: '14:25', severity: 'high' },
    { id: 2, message: 'Porta aberta por mais de 5 minutos - Sala 201', time: '13:45', severity: 'medium' },
    { id: 3, message: 'Falha de comunicação - Catraca 03', time: '12:30', severity: 'low' }
  ]
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Visão geral do sistema de controle de acesso</p>
        </div>

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
    </DashboardLayout>
  )
}