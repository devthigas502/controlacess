'use client'

import React, { useState } from 'react'
import { DashboardLayout } from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  UserPlus, 
  Search, 
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Shield,
  ShieldCheck,
  User
} from 'lucide-react'

// Mock data para colaboradores
const mockColaboradores = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@empresa.com',
    department: 'TI',
    role: 'Administrador',
    status: 'Ativo',
    lastAccess: '2024-09-24 14:32',
    accessLevel: 'Alto'
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria.santos@empresa.com',
    department: 'RH',
    role: 'Gerente',
    status: 'Ativo',
    lastAccess: '2024-09-24 12:15',
    accessLevel: 'Médio'
  },
  {
    id: 3,
    name: 'Pedro Costa',
    email: 'pedro.costa@empresa.com',
    department: 'Financeiro',
    role: 'Analista',
    status: 'Inativo',
    lastAccess: '2024-09-20 16:45',
    accessLevel: 'Baixo'
  },
  {
    id: 4,
    name: 'Ana Oliveira',
    email: 'ana.oliveira@empresa.com',
    department: 'Marketing',
    role: 'Coordenadora',
    status: 'Ativo',
    lastAccess: '2024-09-24 11:20',
    accessLevel: 'Médio'
  },
  {
    id: 5,
    name: 'Carlos Lima',
    email: 'carlos.lima@empresa.com',
    department: 'Operações',
    role: 'Supervisor',
    status: 'Ativo',
    lastAccess: '2024-09-24 09:30',
    accessLevel: 'Alto'
  }
]

export default function ColaboradoresPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredColaboradores, setFilteredColaboradores] = useState(mockColaboradores)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = mockColaboradores.filter(colaborador =>
      colaborador.name.toLowerCase().includes(term.toLowerCase()) ||
      colaborador.email.toLowerCase().includes(term.toLowerCase()) ||
      colaborador.department.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredColaboradores(filtered)
  }

  const getAccessLevelIcon = (level: string) => {
    switch (level) {
      case 'Alto':
        return <ShieldCheck className="h-4 w-4 text-red-500" />
      case 'Médio':
        return <Shield className="h-4 w-4 text-yellow-500" />
      case 'Baixo':
        return <User className="h-4 w-4 text-green-500" />
      default:
        return <User className="h-4 w-4 text-gray-500" />
    }
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Colaboradores</h1>
            <p className="text-gray-600">Gerencie colaboradores e suas permissões de acesso</p>
          </div>
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Novo Colaborador
          </Button>
        </div>

        {/* Estatísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Colaboradores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockColaboradores.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Colaboradores Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {mockColaboradores.filter(c => c.status === 'Ativo').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Acesso Alto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {mockColaboradores.filter(c => c.accessLevel === 'Alto').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(mockColaboradores.map(c => c.department)).size}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e busca */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Colaboradores</CardTitle>
            <CardDescription>Visualize e gerencie todos os colaboradores do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar colaboradores..."
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
                      <TableHead className="min-w-[200px]">Colaborador</TableHead>
                      <TableHead className="hidden sm:table-cell">Departamento</TableHead>
                      <TableHead className="hidden md:table-cell">Função</TableHead>
                      <TableHead className="hidden lg:table-cell">Nível de Acesso</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden xl:table-cell">Último Acesso</TableHead>
                      <TableHead className="w-[80px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                <TableBody>
                  {filteredColaboradores.map((colaborador) => (
                    <TableRow key={colaborador.id}>
                      <TableCell className="min-w-[200px]">
                        <div>
                          <div className="font-medium">{colaborador.name}</div>
                          <div className="text-sm text-gray-500 truncate">{colaborador.email}</div>
                          <div className="sm:hidden text-xs text-gray-400 mt-1">
                            {colaborador.department} • {colaborador.role}
                          </div>
                          <div className="md:hidden lg:flex lg:items-center lg:gap-2 mt-1">
                            <div className="lg:hidden flex items-center gap-1">
                              {getAccessLevelIcon(colaborador.accessLevel)}
                              <span className="text-xs">{colaborador.accessLevel}</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{colaborador.department}</TableCell>
                      <TableCell className="hidden md:table-cell">{colaborador.role}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          {getAccessLevelIcon(colaborador.accessLevel)}
                          <span className="text-sm">{colaborador.accessLevel}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(colaborador.status)}
                      </TableCell>
                      <TableCell className="hidden xl:table-cell text-sm text-gray-500">
                        {colaborador.lastAccess}
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