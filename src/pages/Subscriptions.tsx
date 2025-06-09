
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Download } from "lucide-react"

const subscriptionData = [
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
]

export default function Subscriptions() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Subscriptions</h1>
            <p className="text-muted-foreground mt-2">Manage user subscriptions and billing</p>
          </div>
          <Button className="bg-accent hover:bg-accent/90">
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
                  <Input placeholder="Search subscriptions..." className="pl-8" />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
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
                {subscriptionData.map((subscription) => (
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
                      <Badge variant={subscription.status === "Active" ? "default" : "destructive"}>
                        {subscription.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-white">{subscription.nextBilling}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View</Button>
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
