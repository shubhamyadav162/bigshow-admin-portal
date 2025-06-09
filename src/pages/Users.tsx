
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, UserPlus, Download } from "lucide-react"

const userData = [
  {
    id: "USR001",
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg",
    plan: "Premium",
    status: "Active",
    joinDate: "2024-01-15",
    lastActive: "2 hours ago",
    totalWatch: "45h 30m"
  },
  {
    id: "USR002",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "/placeholder.svg",
    plan: "Basic",
    status: "Active",
    joinDate: "2024-01-10",
    lastActive: "1 day ago",
    totalWatch: "23h 15m"
  },
  {
    id: "USR003",
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar: "/placeholder.svg",
    plan: "Premium",
    status: "Inactive",
    joinDate: "2023-12-01",
    lastActive: "1 week ago",
    totalWatch: "67h 45m"
  },
  {
    id: "USR004",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    avatar: "/placeholder.svg",
    plan: "Basic",
    status: "Active",
    joinDate: "2024-01-20",
    lastActive: "30 minutes ago",
    totalWatch: "12h 20m"
  }
]

export default function Users() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Users</h1>
            <p className="text-muted-foreground mt-2">Manage platform users and their activities</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-accent hover:bg-accent/90">
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12,458</div>
              <p className="text-xs text-green-400">+8% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">9,234</div>
              <p className="text-xs text-green-400">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">New This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">1,256</div>
              <p className="text-xs text-green-400">+24% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Watch Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">2h 45m</div>
              <p className="text-xs text-green-400">+5% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-white">User Management</CardTitle>
                <CardDescription>View and manage all platform users</CardDescription>
              </div>
              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search users..." className="pl-8" />
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
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Watch Time</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.plan === "Premium" ? "default" : "secondary"}>
                        {user.plan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "Active" ? "default" : "destructive"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-white">{user.joinDate}</TableCell>
                    <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
                    <TableCell className="text-white">{user.totalWatch}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Manage</Button>
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
