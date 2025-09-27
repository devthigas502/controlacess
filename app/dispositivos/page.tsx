'use client'

import React, { useState } from 'react'
import { DashboardLayout } from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Settings,
  Power,
  Wifi,
  Monitor,
  DoorOpen,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react'

// Mock data para dispositivos
const mockDevices = [
  {
    id: 1,
    name: 'Catraca Principal',
    type: 'Catraca',
    location: 'Portaria Principal',
    ipAddress: '192.168.1.101',
    status: 'online',
    lastSeen: '2024-09-24 14:35',
    firmware: '2.1.4',
    batteryLevel: null,
    accessCount: 1245
  },
  {
    id: 2,
    name: 'Porta Data Center',
    type: 'Controle de Porta',
    location: 'Data Center - Subsolo',
    ipAddress: '192.168.1.102',
    status: 'offline',
    lastSeen: '2024-09-24 12:30',
    firmware: '1.8.2',
    batteryLevel: null,
    accessCount: 89
  },
  {
    id: 3,
    name: 'Catraca Lateral',
    type: 'Catraca',
    location: 'Entrada Lateral',
    ipAddress: '192.168.1.103',
    status: 'online',
    lastSeen: '2024-09-24 14:34',
    firmware: '2.1.4',
    batteryLevel: null,
    accessCount: 567
  },
  {
    id: 4,
    name: 'Botoeira Sala Reunião A',
    type: 'Botoeira Virtual',
    location: 'Sala de Reunião A - 2º Andar',
    ipAddress: '192.168.1.104',
    status: 'warning',
    lastSeen: '2024-09-24 14:10',
    firmware: '1.5.1',
    batteryLevel: 75,
    accessCount: 234
  },
  {
    id: 5,
    name: 'Leitor RH',
    type: 'Leitor RFID',
    location: 'RH - 2º Andar',
    ipAddress: '192.168.1.105',
    status: 'online',
    lastSeen: '2024-09-24 14:33',
    firmware: '3.0.1',
    batteryLevel: null,
    accessCount: 445
  },
  {
    id: 6,
    name: 'Controle Garagem',
    type: 'Controle de Porta',
    location: 'Garagem Subsolo',
    ipAddress: '192.168.1.106',
    status: 'online',
    lastSeen: '2024-09-24 14:32',
    firmware: '2.0.3',
    batteryLevel: null,
    accessCount: 178
  }
]

export default function DispositivosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredDevices, setFilteredDevices] = useState(mockDevices)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = mockDevices.filter(device =>
      device.name.toLowerCase().includes(term.toLowerCase()) ||
      device.location.toLowerCase().includes(term.toLowerCase()) ||
      device.type.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredDevices(filtered)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'offline':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <XCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      online: 'bg-green-100 text-green-800',
      offline: 'bg-red-100 text-red-800',
      warning: 'bg-yellow-100 text-yellow-800'
    }
    
    const labels = {
      online: 'Online',
      offline: 'Offline',
      warning: 'Atenção'
    }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'Catraca':
        return <Monitor className="h-4 w-4" />
      case 'Controle de Porta':
        return <DoorOpen className="h-4 w-4" />
      case 'Botoeira Virtual':
        return <Power className="h-4 w-4" />
      case 'Leitor RFID':
        return <Wifi className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  const onlineDevices = mockDevices.filter(d => d.status === 'online').length
  const offlineDevices = mockDevices.filter(d => d.status === 'offline').length
  const warningDevices = mockDevices.filter(d => d.status === 'warning').length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dispositivos</h1>
            <p className="text-gray-600">Gerencie catracas, leitores e controles de acesso</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Novo Dispositivo
          </Button>
        </div>

        {/* Estatísticas dos dispositivos */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Dispositivos</CardTitle>
              <Monitor className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockDevices.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Online</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{onlineDevices}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Offline</CardTitle>
              <XCircle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{offlineDevices}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Com Alertas</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{warningDevices}</div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de dispositivos */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Dispositivos</CardTitle>
            <CardDescription>Monitore e configure todos os dispositivos de controle de acesso</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar dispositivos..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[200px]">Dispositivo</TableHead>
                      <TableHead className="hidden sm:table-cell">Localização</TableHead>
                      <TableHead className="hidden md:table-cell">IP</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Firmware</TableHead>
                      <TableHead className="hidden xl:table-cell">Acessos</TableHead>
                      <TableHead className="hidden xl:table-cell">Último Sinal</TableHead>
                      <TableHead className="w-[80px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                <TableBody>
                  {filteredDevices.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell className="min-w-[200px]">
                        <div className="flex items-center gap-3">
                          {getDeviceIcon(device.type)}
                          <div className="min-w-0 flex-1">
                            <div className="font-medium truncate">{device.name}</div>
                            <div className="text-sm text-gray-500">{device.type}</div>
                            <div className="sm:hidden mt-1">
                              <div className="text-xs text-gray-400 truncate">{device.location}</div>
                              <div className="md:hidden font-mono text-xs text-gray-400 mt-1">{device.ipAddress}</div>
                              <div className="lg:hidden font-mono text-xs text-gray-400 mt-1">v{device.firmware}</div>
                              <div className="xl:hidden text-xs text-gray-400 mt-1">
                                {device.accessCount.toLocaleString()} acessos
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell truncate max-w-[150px]">{device.location}</TableCell>
                      <TableCell className="hidden md:table-cell font-mono text-sm">{device.ipAddress}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(device.status)}
                          <div className="hidden sm:block">
                            {getStatusBadge(device.status)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell font-mono text-sm">{device.firmware}</TableCell>
                      <TableCell className="hidden xl:table-cell">{device.accessCount.toLocaleString()}</TableCell>
                      <TableCell className="hidden xl:table-cell text-sm text-gray-500">
                        {device.lastSeen}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hidden sm:inline-flex">
                            <Power className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}