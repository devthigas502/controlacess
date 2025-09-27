'use client'

import React, { useState } from 'react'
import { DashboardLayout } from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Briefcase,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Building,
  Calendar
} from 'lucide-react'

// Mock data para prestadores
const mockPrestadores = [
  {
    id: 1,
    name: 'José da Silva',
    company: 'Manutenção Técnica Ltda',
    service: 'Manutenção Elétrica',
    contractPeriod: '2024-09-01 até 2024-12-31',
    supervisor: 'João Silva',
    accessLevel: 'Temporário',
    status: 'Ativo',
    badgeNumber: 'P001'
  },
  {
    id: 2,
    name: 'Maria Fernandes',
    company: 'Limpeza Profissional S.A.',
    service: 'Serviços de Limpeza',
    contractPeriod: '2024-08-15 até 2024-11-15',
    supervisor: 'Maria Santos',
    accessLevel: 'Diário',
    status: 'Ativo',
    badgeNumber: 'P002'
  },
  {
    id: 3,
    name: 'Carlos Oliveira',
    company: 'Jardinagem Verde Ltda',
    service: 'Manutenção de Jardins',
    contractPeriod: '2024-06-01 até 2024-12-31',
    supervisor: 'Pedro Costa',
    accessLevel: 'Semanal',
    status: 'Ativo',
    badgeNumber: 'P003'
  },
  {
    id: 4,
    name: 'Ana Costa',
    company: 'TI Solutions',
    service: 'Suporte Técnico',
    contractPeriod: '2024-09-10 até 2024-10-10',
    supervisor: 'Ana Oliveira',
    accessLevel: 'Temporário',
    status: 'Inativo',
    badgeNumber: 'P004'
  },
  {
    id: 5,
    name: 'Roberto Santos',
    company: 'Segurança 24h',
    service: 'Segurança Patrimonial',
    contractPeriod: '2024-07-01 até 2025-06-30',
    supervisor: 'Carlos Lima',
    accessLevel: 'Permanente',
    status: 'Ativo',
    badgeNumber: 'P005'
  }
]

export default function PrestadoresPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPrestadores, setFilteredPrestadores] = useState(mockPrestadores)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = mockPrestadores.filter(prestador =>
      prestador.name.toLowerCase().includes(term.toLowerCase()) ||
      prestador.company.toLowerCase().includes(term.toLowerCase()) ||
      prestador.service.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredPrestadores(filtered)
  }

  const getStatusBadge = (status: string) => {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        status === 'Ativo'
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
      }`}>
        {status}
      </span>
    )
  }

  const getAccessLevelBadge = (level: string) => {
    let colorClass = 'bg-gray-100 text-gray-800'
    switch (level) {
      case 'Permanente':
        colorClass = 'bg-blue-100 text-blue-800'
        break
      case 'Temporário':
        colorClass = 'bg-yellow-100 text-yellow-800'
        break
      case 'Diário':
        colorClass = 'bg-green-100 text-green-800'
        break
      case 'Semanal':
        colorClass = 'bg-purple-100 text-purple-800'
        break
    }
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
        {level}
      </span>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Prestadores de Serviço</h1>
            <p className="text-gray-600">Gestão de prestadores e contratos de serviço</p>
          </div>
          <Button className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Novo Prestador
          </Button>
        </div>

        {/* Estatísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Prestadores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockPrestadores.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prestadores Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {mockPrestadores.filter(p => p.status === 'Ativo').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Empresas Parceiras</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(mockPrestadores.map(p => p.company)).size}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Acesso Permanente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mockPrestadores.filter(p => p.accessLevel === 'Permanente').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e busca */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Prestadores</CardTitle>
            <CardDescription>Gerencie prestadores de serviço e seus contratos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar prestadores..."
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
                      <TableHead className="min-w-[200px]">Prestador</TableHead>
                      <TableHead className="hidden sm:table-cell min-w-[150px]">Empresa</TableHead>
                      <TableHead className="hidden md:table-cell">Serviço</TableHead>
                      <TableHead className="hidden lg:table-cell">Supervisor</TableHead>
                      <TableHead className="hidden xl:table-cell min-w-[180px]">Período</TableHead>
                      <TableHead className="hidden lg:table-cell">Nível</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[80px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                <TableBody>
                  {filteredPrestadores.map((prestador) => (
                    <TableRow key={prestador.id}>
                      <TableCell className="min-w-[200px]">
                        <div>
                          <div className="font-medium">{prestador.name}</div>
                          <div className="text-sm text-gray-500">Crachá: {prestador.badgeNumber}</div>
                          <div className="sm:hidden mt-1">
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                              <Building className="h-3 w-3" />
                              <span className="truncate">{prestador.company}</span>
                            </div>
                            <div className="text-xs text-gray-400 mt-1 truncate">
                              {prestador.service}
                            </div>
                            <div className="lg:hidden mt-1">
                              {getAccessLevelBadge(prestador.accessLevel)}
                            </div>
                            <div className="xl:hidden text-xs text-gray-400 mt-1">
                              <Calendar className="h-3 w-3 inline mr-1" />
                              <span className="text-xs">{prestador.contractPeriod}</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell min-w-[150px]">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{prestador.company}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell truncate max-w-[120px]">{prestador.service}</TableCell>
                      <TableCell className="hidden lg:table-cell">{prestador.supervisor}</TableCell>
                      <TableCell className="hidden xl:table-cell min-w-[180px]">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <span className="text-sm">{prestador.contractPeriod}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {getAccessLevelBadge(prestador.accessLevel)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(prestador.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hidden sm:inline-flex">
                            <Trash2 className="h-4 w-4" />
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