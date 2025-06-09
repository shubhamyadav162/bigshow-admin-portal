
import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Search, Filter, Download, Eye, Edit, Ban, CheckCircle } from "lucide-react"

interface Subscription {
  id: string
  userName: string
  email: string
  planName: string
  amount: string
  paymentMethod: string
  status: "Active" | "Expired" | "Cancelled" | "Pending"
  startDate: string
  nextBilling: string
}

export default function Subscriptions() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: "SUB001",
      userName: "John Doe",
      email: "john@example.com",
      planName: "Premium Monthly",
      amount: "₹299",
      paymentMethod: "Razorpay",
      status: "Active",
      startDate: "2024-01-15",
      nextBilling: "2024-02-15"
    },
    {
      id: "SUB002",
      userName: "Jane Smith",
      email: "jane@example.com",
      planName: "Basic Annual",
      amount: "₹1999",
      paymentMethod: "LightSpeed",
      status: "Active",
      startDate: "2024-01-10",
      nextBilling: "2025-01-10"
    },
    {
      id: "SUB003",
      userName: "Mike Johnson",
      email: "mike@example.com",
      planName: "Premium Annual",
      amount: "₹2999",
      paymentMethod: "Razorpay",
      status: "Expired",
      startDate: "2023-12-01",
      nextBilling: "2024-12-01"
    }
  ])

  const exportData = () => {
    toast({
      title: "Export Started",
      description: "Subscription data is being exported. You'll receive an email when ready."
    })
  }

  const viewSubscription = (subscriptionId: string) => {
    toast({
      title: "View Subscription",
      description: `Viewing details for subscription ${subscriptionId}`
    })
  }

  const editSubscription = (subscriptionId: string) => {
    toast({
      title: "Edit Subscription",
      description: `Opening editor for subscription ${subscriptionId}`
    })
  }

  const suspendSubscription = (subscriptionId: string) => {
    setSubscriptions(subs => 
      subs.map(sub => 
        sub.id === subscriptionId 
          ? { ...sub, status: "Cancelled" as const }
          : sub
      )
    )
    toast({
      title: "Subscription Suspended",
      description: `Subscription ${subscriptionId} has been suspended`
    })
  }

  const reactivateSubscription = (subscriptionId: string) => {
    setSubscriptions(subs => 
      subs.map(sub => 
        sub.id === subscriptionId 
          ? { ...sub, status: "Active" as const }
          : sub
      )
    )
    toast({
      title: "Subscription Reactivated",
      description: `Subscription ${subscriptionId} has been reactivated`
    })
  }

  const applyFilters = () => {
    toast({
      title: "Filters Applied",
      description: `Filtering by status: ${statusFilter}, search: ${searchTerm}`
    })
  }

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset"
    })
  }

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || sub.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active": return "default"
      case "Expired": return "destructive"
      case "Cancelled": return "secondary"
      case "Pending": return "outline"
      default: return "outline"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Subscriptions</h1>
            <p className="text-muted-foreground mt-2">Manage user subscriptions and billing</p>
          </div>
          <Button className="bg-accent hover:bg-accent/90" onClick={exportData}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">2,847</div>
              <p className="text-xs text-green-400">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">2,234</div>
              <p className="text-xs text-green-400">+8% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">₹8,47,230</div>
              <p className="text-xs text-green-400">+15% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Churn Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">3.2%</div>
              <p className="text-xs text-red-400">+0.5% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-white">Subscription Details</CardTitle>
                <CardDescription>View and manage all user subscriptions</CardDescription>
              </div>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search subscriptions..." 
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={applyFilters}>
                  <Filter className="h-4 w-4 mr-2" />
                  Apply
                </Button>
                <Button variant="outline" onClick={clearFilters}>
                  Clear
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Next Billing</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscriptions.map((subscription) => (
                  <TableRow key={subscription.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-white">{subscription.userName}</div>
                        <div className="text-sm text-muted-foreground">{subscription.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-white">{subscription.planName}</TableCell>
                    <TableCell className="font-medium text-white">{subscription.amount}</TableCell>
                    <TableCell>
                      <Badge variant={subscription.paymentMethod === "Razorpay" ? "default" : "secondary"}>
                        {subscription.paymentMethod}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(subscription.status)}>
                        {subscription.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-white">{subscription.nextBilling}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => viewSubscription(subscription.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => editSubscription(subscription.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {subscription.status === "Active" ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => suspendSubscription(subscription.id)}
                          >
                            <Ban className="h-4 w-4" />
                          </Button>
                        ) : subscription.status === "Cancelled" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => reactivateSubscription(subscription.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
