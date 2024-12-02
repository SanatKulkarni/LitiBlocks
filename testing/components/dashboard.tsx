"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const fraudData = [
  { name: 'Jan', fraudCases: 400 },
  { name: 'Feb', fraudCases: 300 },
  { name: 'Mar', fraudCases: 200 },
  { name: 'Apr', fraudCases: 278 },
  { name: 'May', fraudCases: 189 },
  { name: 'Jun', fraudCases: 239 },
]

const modelPerformanceData = [
  { name: 'Week 1', accuracy: 0.92 },
  { name: 'Week 2', accuracy: 0.94 },
  { name: 'Week 3', accuracy: 0.93 },
  { name: 'Week 4', accuracy: 0.95 },
  { name: 'Week 5', accuracy: 0.96 },
]

const precisionRecallData = [
  { x: 100, y: 20 },
  { x: 80, y: 40 },
  { x: 60, y: 60 },
  { x: 40, y: 80 },
  { x: 20, y: 90 },
  { x: 10, y: 95 },
];

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('fraud-insights')
  const [isModelUpdating, setIsModelUpdating] = useState(false)
  const [updateLogs, setUpdateLogs] = useState([
    { date: '2023-06-01', version: 'v1.2.3', status: 'Completed' },
    { date: '2023-05-15', version: 'v1.2.2', status: 'Completed' },
    { date: '2023-05-01', version: 'v1.2.1', status: 'Completed' },
  ]);

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleModelUpdate = () => {
    setIsModelUpdating(true);
    // Simulating a model update process
    setTimeout(() => {
      setIsModelUpdating(false);
      const newLog = {
        date: new Date().toISOString().split('T')[0],
        version: 'v1.2.4',
        status: 'Completed'
      };
      setUpdateLogs([newLog, ...updateLogs.slice(0, 2)]);
      alert('Model updated successfully!');
    }, 2000);
  }

  const handleGenerateReport = () => {
    alert('Generating report... This feature is not yet implemented.')
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard title="Participating Companies" value="1,234" id="participating-companies" />
        <MetricCard title="Total Fraud Cases" value="5,678" id="total-fraud-cases" />
        <MetricCard title="Avg. Fraud Score" value="0.72" id="avg-fraud-score" />
        <MetricCard title="Model Accuracy" value="87.5%" id="model-accuracy" />
      </div>
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
        <TabsList>
          <TabsTrigger value="fraud-insights">Fraud Insights</TabsTrigger>
          <TabsTrigger value="data-aggregation">Data Aggregation</TabsTrigger>
          <TabsTrigger value="model-management">Model Management</TabsTrigger>
          <TabsTrigger value="security">Security & Compliance</TabsTrigger>
        </TabsList>
        <TabsContent value="fraud-insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fraud Cases Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={fraudData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="fraudCases" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Fraud Severity Index</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7.2 / 10</div>
              <p className="text-muted-foreground">High severity based on recent trends</p>
            </CardContent>
          </Card>
          <Button onClick={handleGenerateReport}>Generate Fraud Report</Button>
        </TabsContent>
        <TabsContent value="data-aggregation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Contributions by Company</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { name: 'Company A', dataPoints: 1200 },
                  { name: 'Company B', dataPoints: 900 },
                  { name: 'Company C', dataPoints: 1500 },
                  { name: 'Company D', dataPoints: 800 },
                  { name: 'Company E', dataPoints: 1100 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="dataPoints" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Button onClick={handleGenerateReport}>Generate Data Report</Button>
        </TabsContent>
        <TabsContent value="model-management" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Update Control</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={handleModelUpdate} disabled={isModelUpdating}>
                {isModelUpdating ? 'Updating Model...' : 'Trigger Manual Update'}
              </Button>
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">Update Logs</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {updateLogs.map((log, index) => (
                      <TableRow key={index}>
                        <TableCell>{log.date}</TableCell>
                        <TableCell>{log.version}</TableCell>
                        <TableCell>{log.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2">Confusion Matrix</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead></TableHead>
                        <TableHead>Predicted Positive</TableHead>
                        <TableHead>Predicted Negative</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Actual Positive</TableCell>
                        <TableCell>85</TableCell>
                        <TableCell>15</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Actual Negative</TableCell>
                        <TableCell>10</TableCell>
                        <TableCell>90</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">Precision-Recall Curve</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid />
                      <XAxis type="number" dataKey="x" name="recall" unit="%" />
                      <YAxis type="number" dataKey="y" name="precision" unit="%" />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Scatter name="Precision-Recall" data={precisionRecallData} fill="#8884d8" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">Model Version Comparison</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead>Current Version</TableHead>
                      <TableHead>Previous Version</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Accuracy</TableCell>
                      <TableCell>87.5%</TableCell>
                      <TableCell>85.0%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Precision</TableCell>
                      <TableCell>89.4%</TableCell>
                      <TableCell>86.7%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Recall</TableCell>
                      <TableCell>85.0%</TableCell>
                      <TableCell>83.3%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>F1 Score</TableCell>
                      <TableCell>87.1%</TableCell>
                      <TableCell>85.0%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ZK-SNARK Verification Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <LogItem message="Verification successful for Company A" time="2 minutes ago" />
                <LogItem message="Verification successful for Company B" time="5 minutes ago" />
                <LogItem message="Verification successful for Company C" time="10 minutes ago" />
              </ul>
            </CardContent>
          </Card>
          <Button onClick={handleGenerateReport}>Generate Security Report</Button>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MetricCard({ title, value, id }: { title: string, value: string, id: string }) {
  return (
    <Card id={id}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}

function LogItem({ message, time }: { message: string, time: string }) {
  return (
    <li className="flex items-center space-x-2">
      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      <span className="flex-1">{message}</span>
      <span className="text-sm text-muted-foreground">{time}</span>
    </li>
  )
}

