'use client'

import React, { useState } from 'react'
import { DashboardLayout } from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  Download, 
  Search, 
  Filter,
  Calendar,
  FileText,
  Users,
  Clock,
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Eye
} from 'lucide-react'

// Mock data para relatórios
const mockReports = [
  {
    id: 1,
    name: 'Relatório de Acessos - Setembro 2024',
    type: 'Acessos',
    period: '01/09/2024 - 24/09/2024',
    generated: '2024-09-24 14:00',
    size: '2.4 MB',
    records: 15847,
    status: 'Concluído'
  },
  {
    id: 2,
    name: 'Auditoria de Segurança - Semanal',
    type: 'Segurança',
    period: '18/09/2024 - 24/09/2024',
    generated: '2024-09-24 08:00',
    size: '856 KB',
    records: 234,
    status: 'Concluído'
  },
  {
    id: 3,
    name: 'Controle de Presença - Mensal',
    type: 'Presença',
    period: '01/09/2024 - 24/09/2024',
    generated: '2024-09-24 06:00',
    size: '1.8 MB',
    records: 8945,
    status: 'Processando'
  },
  {
    id: 4,
    name: 'Log de Dispositivos - Diário',
    type: 'Dispositivos',
    period: '24/09/2024',
    generated: '2024-09-24 00:00',
    size: '445 KB',
    records: 1205,
    status: 'Concluído'
  }
]

const accessData = [
  { hour: '08:00', entries: 245, exits: 12 },
  { hour: '09:00', entries: 189, exits: 45 },
  { hour: '10:00', entries: 67, exits: 23 },
  { hour: '11:00', entries: 45, exits: 34 },
  { hour: '12:00', entries: 123, exits: 189 },
  { hour: '13:00', entries: 234, exits: 67 },
  { hour: '14:00', entries: 78, exits: 45 },
  { hour: '15:00', entries: 56, exits: 78 },
  { hour: '16:00', entries: 34, exits: 123 },
  { hour: '17:00', entries: 23, exits: 456 },
  { hour: '18:00', entries: 12, exits: 234 }
]

export default function RelatoriosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredReports, setFilteredReports] = useState(mockReports)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    const filtered = mockReports.filter(report =>
      report.name.toLowerCase().includes(term.toLowerCase()) ||
      report.type.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredReports(filtered)
  }

  const getStatusBadge = (status: string) => {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        status === 'Concluído' 
          ? 'bg-green-100 text-green-800' 
          : status === 'Processando'
          ? 'bg-yellow-100 text-yellow-800'
          : 'bg-red-100 text-red-800'
      }`}>
        {status}
      </span>
    )
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Acessos':
        return <Users className="h-4 w-4 text-blue-500" />
      case 'Segurança':
        return <Shield className="h-4 w-4 text-red-500" />
      case 'Presença':
        return <Clock className="h-4 w-4 text-green-500" />
      case 'Dispositivos':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const totalRecords = mockReports.reduce((sum, report) => sum + report.records, 0)
  const completedReports = mockReports.filter(r => r.status === 'Concluído').length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
            <p className="text-gray-600">Gere e acompanhe relatórios de acesso e conformidade</p>
          </div>
          <Button className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Novo Relatório
          </Button>
        </div>

        {/* Estatísticas dos relatórios */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Relatórios Gerados</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockReports.length}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +2 esta semana
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedReports}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Registros</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRecords.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conformidade LGPD</CardTitle>
              <Shield className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">100%</div>
              <p className="text-xs text-muted-foreground">
                Logs criptografados
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Acessos por Hora */}
          <Card>
            <CardHeader>
              <CardTitle>Acessos por Horário - Hoje</CardTitle>
              <CardDescription>Entradas e saídas ao longo do dia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {accessData.map((data) => (
                  <div key={data.hour} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium w-12">{data.hour}</span>
                      <div className="flex space-x-2">
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-green-500 rounded"></div>
                          <span className="text-xs text-green-600">Entradas: {data.entries}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-red-500 rounded"></div>
                          <span className="text-xs text-red-600">Saídas: {data.exits}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <div 
                        className="bg-green-200 h-4 rounded"
                        style={{ width: `${Math.max(data.entries / 5, 2)}px` }}
                      ></div>
                      <div 
                        className="bg-red-200 h-4 rounded"
                        style={{ width: `${Math.max(data.exits / 5, 2)}px` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Relatórios Rápidos */}
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Rápidos</CardTitle>
              <CardDescription>Gere relatórios predefinidos instantaneamente</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Acessos do Dia', description: 'Todos os acessos de hoje', icon: <Clock className="h-4 w-4" /> },
                  { name: 'Usuários Ativos', description: 'Lista de usuários que acessaram hoje', icon: <Users className="h-4 w-4" /> },
                  { name: 'Alertas de Segurança', description: 'Incidentes das últimas 24h', icon: <Shield className="h-4 w-4" /> },
                  { name: 'Status dos Dispositivos', description: 'Relatório de conectividade', icon: <AlertTriangle className="h-4 w-4" /> }
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between border rounded-lg p-3 hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className="text-gray-500">
                        {report.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{report.name}</p>
                        <p className="text-xs text-gray-500">{report.description}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3 mr-1" />
                      Gerar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de relatórios */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Relatórios</CardTitle>
            <CardDescription>Visualize e baixe relatórios anteriores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar relatórios..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Período
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Relatório</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead>Registros</TableHead>
                    <TableHead>Tamanho</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Gerado em</TableHead>
                    <TableHead className="w-[100px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {getTypeIcon(report.type)}
                          <div>
                            <div className="font-medium">{report.name}</div>
                            <div className="text-sm text-gray-500">{report.type}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{report.period}</TableCell>
                      <TableCell>{report.records.toLocaleString()}</TableCell>
                      <TableCell>{report.size}</TableCell>
                      <TableCell>
                        {getStatusBadge(report.status)}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {report.generated}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" disabled={report.status !== 'Concluído'}>
                            <Download className="h-4 w-4" />
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