'use client'

import React, { useState } from 'react'
import { DashboardLayout } from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  UserCheck,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Building
} from 'lucide-react'

// Mock data para visitantes
const mockVisitantes = [
  {
    id: 1,
    name: 'Carlos Mendes',
    company: 'Tech Solutions Ltda',
    purpose: 'Reunião de Negócios',
    host: 'João Silva',
    entryTime: '2024-09-27 09:00',
    exitTime: null,
    status: 'Presente',
    badgeNumber: 'V001'
  },
  {
    id: 2,
    name: 'Ana Paula',
    company: 'Consultoria XYZ',
    purpose: 'Auditoria',
    host: 'Maria Santos',
    entryTime: '2024-09-27 10:30',
    exitTime: '2024-09-27 12:00',
    status: 'Saiu',
    badgeNumber: 'V002'
  },
  {
    id: 3,
    name: 'Roberto Lima',
    company: 'Parceiro ABC',
    purpose: 'Entrega de Material',
    host: 'Pedro Costa',
    entryTime: '2024-09-26 14:15',
    exitTime: '2024-09-26 15:45',
    status: 'Saiu',
    badgeNumber: 'V003'
  },
  {
    id: 4,
    name: 'Fernanda Oliveira',
    company: 'Cliente Importante',
    purpose: 'Apresentação de Produto',
    host: 'Ana Oliveira',
    entryTime: '2024-09-27 08:45',
    exitTime: null,
    status: 'Presente',
    badgeNumber: 'V004'
  }
]

export default function VisitantesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredVisitantes, setFilteredVisitantes] = useState(mockVisitantes)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = mockVisitantes.filter(visitante =>
      visitante.name.toLowerCase().includes(term.toLowerCase()) ||
      visitante.company.toLowerCase().includes(term.toLowerCase()) ||
      visitante.purpose.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredVisitantes(filtered)
  }

  const getStatusBadge = (status: string) => {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        status === 'Presente'
          ? 'bg-green-100 text-green-800'
          : 'bg-gray-100 text-gray-800'
      }`}>
        {status}
      </span>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Visitantes</h1>
            <p className="text-gray-600">Controle e monitoramento de visitantes no prédio</p>
          </div>
          <Button className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Registrar Visita
          </Button>
        </div>

        {/* Estatísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visitantes Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockVisitantes.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Presentes Agora</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {mockVisitantes.filter(v => v.status === 'Presente').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Empresas Visitantes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(mockVisitantes.map(v => v.company)).size}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crachás Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {mockVisitantes.filter(v => v.status === 'Presente').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e busca */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Visitantes</CardTitle>
            <CardDescription>Histórico completo de visitantes e controle de acesso</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar visitantes..."
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

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Visitante</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Acompanhante</TableHead>
                    <TableHead>Entrada</TableHead>
                    <TableHead>Saída</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVisitantes.map((visitante) => (
                    <TableRow key={visitante.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{visitante.name}</div>
                          <div className="text-sm text-gray-500">Crachá: {visitante.badgeNumber}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-400" />
                          <span>{visitante.company}</span>
                        </div>
                      </TableCell>
                      <TableCell>{visitante.purpose}</TableCell>
                      <TableCell>{visitante.host}</TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {visitante.entryTime}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {visitante.exitTime || '-'}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(visitante.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}