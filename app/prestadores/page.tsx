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
  Calendar,
  Upload,
  X,
  Save,
  AlertTriangle,
  CheckCircle
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
    badgeNumber: 'P001',
    asoExpiryDate: '2024-12-15',
    asoCertificate: null
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
    badgeNumber: 'P002',
    asoExpiryDate: '2024-10-20',
    asoCertificate: null
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
    badgeNumber: 'P003',
    asoExpiryDate: '2028-09-30',
    asoCertificate: null
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
    badgeNumber: 'P004',
    asoExpiryDate: '2024-08-15',
    asoCertificate: null
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
    badgeNumber: 'P005',
    asoExpiryDate: '2026-01-15',
    asoCertificate: null
  }
]

export default function PrestadoresPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPrestadores, setFilteredPrestadores] = useState(mockPrestadores)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    service: '',
    contractPeriod: '',
    supervisor: '',
    accessLevel: 'Temporário',
    badgeNumber: '',
    asoExpiryDate: '',
    asoCertificate: null as File | null
  })

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = mockPrestadores.filter(prestador =>
      prestador.name.toLowerCase().includes(term.toLowerCase()) ||
      prestador.company.toLowerCase().includes(term.toLowerCase()) ||
      prestador.service.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredPrestadores(filtered)
  }

  const isAsoExpired = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    return expiry < today
  }

  const getAsoStatusBadge = (expiryDate: string) => {
    const expired = isAsoExpired(expiryDate)
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        expired
          ? 'bg-red-100 text-red-800'
          : 'bg-green-100 text-green-800'
      }`}>
        {expired ? (
          <>
            <AlertTriangle className="h-3 w-3 mr-1" />
            Vencido
          </>
        ) : (
          <>
            <CheckCircle className="h-3 w-3 mr-1" />
            Válido
          </>
        )}
      </span>
    )
  }

  const openCreateModal = () => {
    setFormData({
      name: '',
      company: '',
      service: '',
      contractPeriod: '',
      supervisor: '',
      accessLevel: 'Temporário',
      badgeNumber: '',
      asoExpiryDate: '',
      asoCertificate: null
    })
    setShowCreateModal(true)
  }

  const closeCreateModal = () => {
    setShowCreateModal(false)
    setFormData({
      name: '',
      company: '',
      service: '',
      contractPeriod: '',
      supervisor: '',
      accessLevel: 'Temporário',
      badgeNumber: '',
      asoExpiryDate: '',
      asoCertificate: null
    })
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, asoCertificate: file }))
    }
  }

  const handleSavePrestador = () => {
    if (!formData.name || !formData.company || !formData.asoExpiryDate) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return
    }

    // Aqui seria feita a chamada para a API para salvar o prestador
    // Por enquanto, apenas simulamos o cadastro
    alert(`Prestador ${formData.name} cadastrado com sucesso!`)
    closeCreateModal()
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
          <Button 
            className="flex items-center gap-2"
            onClick={openCreateModal}
          >
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
                      <TableHead className="hidden md:table-cell">ASO</TableHead>
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
                      <TableCell className="hidden md:table-cell">
                        {getAsoStatusBadge(prestador.asoExpiryDate)}
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

        {/* Modal de Cadastro de Prestador */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Cadastrar Novo Prestador
                </h3>
                <button
                  onClick={closeCreateModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Informações Básicas */}
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-900">Informações Básicas</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo *
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Digite o nome completo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Empresa *
                      </label>
                      <Input
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        placeholder="Nome da empresa"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Serviço Prestado
                      </label>
                      <Input
                        value={formData.service}
                        onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                        placeholder="Ex: Manutenção Elétrica"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Supervisor
                      </label>
                      <Input
                        value={formData.supervisor}
                        onChange={(e) => setFormData(prev => ({ ...prev, supervisor: e.target.value }))}
                        placeholder="Nome do supervisor"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Período do Contrato
                      </label>
                      <Input
                        value={formData.contractPeriod}
                        onChange={(e) => setFormData(prev => ({ ...prev, contractPeriod: e.target.value }))}
                        placeholder="Ex: 2024-09-01 até 2024-12-31"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nível de Acesso
                      </label>
                      <select
                        value={formData.accessLevel}
                        onChange={(e) => setFormData(prev => ({ ...prev, accessLevel: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Permanente">Permanente</option>
                        <option value="Temporário">Temporário</option>
                        <option value="Diário">Diário</option>
                        <option value="Semanal">Semanal</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número do Crachá
                      </label>
                      <Input
                        value={formData.badgeNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, badgeNumber: e.target.value }))}
                        placeholder="Ex: P001"
                      />
                    </div>
                  </div>
                </div>

                {/* Informações de Saúde Ocupacional */}
                <div className="space-y-4 border-t pt-6">
                  <h4 className="text-md font-medium text-gray-900">Atestado de Saúde Ocupacional (ASO)</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data de Vencimento do ASO *
                      </label>
                      <Input
                        type="date"
                        value={formData.asoExpiryDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, asoExpiryDate: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload do Atestado
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="aso-certificate"
                        />
                        <label
                          htmlFor="aso-certificate"
                          className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-gray-400 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <Upload className="h-5 w-5 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {formData.asoCertificate ? formData.asoCertificate.name : 'Selecionar arquivo'}
                            </span>
                          </div>
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Formatos aceitos: PDF, JPG, PNG. Máx. 10MB
                      </p>
                    </div>
                  </div>
                </div>

                {formData.asoExpiryDate && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-800">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm font-medium">Status do ASO:</span>
                    </div>
                    <p className="text-sm text-blue-700 mt-1">
                      {isAsoExpired(formData.asoExpiryDate) ? 'Vencido' : 'Válido'} até {new Date(formData.asoExpiryDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
                <Button
                  variant="outline"
                  onClick={closeCreateModal}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSavePrestador}
                  disabled={!formData.name || !formData.company || !formData.asoExpiryDate}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Salvar Prestador
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}