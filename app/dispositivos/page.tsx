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
  XCircle,
  Clock,
  Save,
  X
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
    accessCount: 1245,
    operatingHoursStart: '06:00',
    operatingHoursEnd: '22:00'
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
    accessCount: 89,
    operatingHoursStart: '00:00',
    operatingHoursEnd: '23:59'
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
    accessCount: 567,
    operatingHoursStart: '06:00',
    operatingHoursEnd: '22:00'
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
    accessCount: 234,
    operatingHoursStart: '08:00',
    operatingHoursEnd: '18:00'
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
    accessCount: 445,
    operatingHoursStart: '08:00',
    operatingHoursEnd: '18:00'
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
    accessCount: 178,
    operatingHoursStart: '06:00',
    operatingHoursEnd: '22:00'
  }
]

export default function DispositivosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredDevices, setFilteredDevices] = useState(mockDevices)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState<typeof mockDevices[0] | null>(null)
  const [scheduleStart, setScheduleStart] = useState('')
  const [scheduleEnd, setScheduleEnd] = useState('')

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

  // Função para verificar se o dispositivo está dentro do horário de funcionamento
  const isWithinOperatingHours = (device: typeof mockDevices[0]) => {
    const now = new Date()
    const currentTime = now.getHours() * 60 + now.getMinutes()
    const [startHour, startMinute] = device.operatingHoursStart.split(':').map(Number)
    const [endHour, endMinute] = device.operatingHoursEnd.split(':').map(Number)
    const startTime = startHour * 60 + startMinute
    const endTime = endHour * 60 + endMinute
    
    return currentTime >= startTime && currentTime <= endTime
  }

  const devicesInOperatingHours = mockDevices.filter(device => 
    device.status === 'online' && isWithinOperatingHours(device)
  ).length

  const openScheduleModal = (device: typeof mockDevices[0]) => {
    setSelectedDevice(device)
    setScheduleStart(device.operatingHoursStart)
    setScheduleEnd(device.operatingHoursEnd)
    setShowScheduleModal(true)
  }

  const closeScheduleModal = () => {
    setShowScheduleModal(false)
    setSelectedDevice(null)
    setScheduleStart('')
    setScheduleEnd('')
  }

  const validateTimeRange = (start: string, end: string): boolean => {
    if (!start || !end) return false;
    const startTime = new Date(`2000-01-01T${start}:00`);
    const endTime = new Date(`2000-01-01T${end}:00`);
    return endTime > startTime;
  };

  const saveSchedule = () => {
    if (selectedDevice && scheduleStart && scheduleEnd) {
      if (!validateTimeRange(scheduleStart, scheduleEnd)) {
        alert('O horário de fim deve ser posterior ao horário de início.');
        return;
      }

      // Aqui seria feita a chamada para a API para salvar os horários
      // Por enquanto, apenas simulamos a atualização
      alert(`Horário de funcionamento atualizado para ${selectedDevice.name}:\n${scheduleStart} - ${scheduleEnd}`)
      closeScheduleModal()
    }
  }

  const validateTime = (time: string) => {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
    return timeRegex.test(time)
  }

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
              <CardTitle className="text-sm font-medium">Em Funcionamento</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{devicesInOperatingHours}</div>
              <p className="text-xs text-muted-foreground">
                Dentro do horário ativo
              </p>
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
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => alert('Funcionalidade de configuração em lote será implementada em breve!')}
              >
                <Clock className="h-4 w-4" />
                Configurar Horários
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
                      <TableHead className="hidden lg:table-cell min-w-[120px]">Horário Funcionamento</TableHead>
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
                              <div className="lg:hidden flex items-center gap-1 text-xs text-gray-400 mt-1">
                                <Clock className="h-3 w-3" />
                                <span>{device.operatingHoursStart}-{device.operatingHoursEnd}</span>
                              </div>
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
                      <TableCell className="hidden lg:table-cell min-w-[120px]">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm font-mono">
                            {device.operatingHoursStart} - {device.operatingHoursEnd}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell font-mono text-sm">{device.firmware}</TableCell>
                      <TableCell className="hidden xl:table-cell">{device.accessCount.toLocaleString()}</TableCell>
                      <TableCell className="hidden xl:table-cell text-sm text-gray-500">
                        {device.lastSeen}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => openScheduleModal(device)}
                            title="Configurar horário de funcionamento"
                          >
                            <Clock className="h-4 w-4" />
                          </Button>
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

        {/* Modal de Configuração de Horários */}
        {showScheduleModal && selectedDevice && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Configurar Horário de Funcionamento
                </h3>
                <button
                  onClick={closeScheduleModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">{selectedDevice.name}</h4>
                  <p className="text-sm text-gray-600">{selectedDevice.location}</p>
                  <p className="text-sm text-gray-600">{selectedDevice.type}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Horário de Início
                    </label>
                    <Input
                      type="time"
                      value={scheduleStart}
                      onChange={(e) => setScheduleStart(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Horário de Fim
                    </label>
                    <Input
                      type="time"
                      value={scheduleEnd}
                      onChange={(e) => setScheduleEnd(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-800">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">Horário Atual:</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    {selectedDevice.operatingHoursStart} - {selectedDevice.operatingHoursEnd}
                  </p>
                </div>

                {!validateTime(scheduleStart) || !validateTime(scheduleEnd) ? (
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-sm text-red-700">
                      Por favor, insira horários válidos no formato HH:MM
                    </p>
                  </div>
                ) : scheduleStart && scheduleEnd && !validateTimeRange(scheduleStart, scheduleEnd) ? (
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-sm text-red-700">
                      O horário de fim deve ser posterior ao horário de início
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
                <Button
                  variant="outline"
                  onClick={closeScheduleModal}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={saveSchedule}
                  disabled={!validateTime(scheduleStart) || !validateTime(scheduleEnd) || !validateTimeRange(scheduleStart, scheduleEnd)}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Salvar Horário
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}