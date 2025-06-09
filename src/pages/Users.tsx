
import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Search, Filter, UserPlus, Download, Eye, Edit, Ban, Mail, Shield } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  avatar: string
  plan: "Premium" | "Basic" | "Free"
  status: "Active" | "Inactive" | "Suspended"
  joinDate: string
  lastActive: string
  totalWatch: string
}

export default function Users() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [planFilter, setPlanFilter] = useState("all")
  const [users, setUsers] = useState<User[]>([
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
  ])

  const exportUsers = () => {
    toast({
      title: "Export Started",
      description: "User data is being exported. You'll receive an email when ready."
    })
  }

  const addUser = () => {
    toast({
      title: "Add User",
      description: "Opening user creation form..."
    })
  }

  const viewUser = (userId: string) => {
    toast({
      title: "View User",
      description: `Viewing profile for user ${userId}`
    })
  }

  const editUser = (userId: string) => {
    toast({
      title: "Edit User",
      description: `Opening editor for user ${userId}`
    })
  }

  const suspendUser = (userId: string) => {
    setUsers(users => 
      users.map(user => 
        user.id === userId 
          ? { ...user, status: "Suspended" as const }
          : user
      )
    )
    toast({
      title: "User Suspended",
      description: `User ${userId} has been suspended`
    })
  }

  const reactivateUser = (userId: string) => {
    setUsers(users => 
      users.map(user => 
        user.id === userId 
          ? { ...user, status: "Active" as const }
          : user
      )
    )
    toast({
      title: "User Reactivated",
      description: `User ${userId} has been reactivated`
    })
  }

  const sendEmail = (userId: string, userEmail: string) => {
    toast({
      title: "Send Email",
      description: `Opening email composer for ${userEmail}`
    })
  }

  const makeAdmin = (userId: string) => {
    toast({
      title: "Admin Rights",
      description: `Granting admin rights to user ${userId}`
    })
  }

  const applyFilters = () => {
    toast({
      title: "Filters Applied",
      description: `Filtering by status: ${statusFilter}, plan: ${planFilter}, search: ${searchTerm}`
    })
  }

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setPlanFilter("all")
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset"
    })
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter
    const matchesPlan = planFilter === "all" || user.plan.toLowerCase() === planFilter
    return matchesSearch && matchesStatus && matchesPlan
  })

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active": return "default"
      case "Inactive": return "secondary"
      case "Suspended": return "destructive"
      default: return "outline"
    }
  }

  const getPlanVariant = (plan: string) => {
    switch (plan) {
      case "Premium": return "default"
      case "Basic": return "secondary"
      case "Free": return "outline"
      default: return "outline"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Users</h1>
            <p className="text-muted-foreground mt-2">Manage platform users and their activities</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={exportUsers}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-accent hover:bg-accent/90" onClick={addUser}>
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
                  <Input 
                    placeholder="Search users..." 
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
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={planFilter} onValueChange={setPlanFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
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
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Watch Time</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
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
                      <Badge variant={getPlanVariant(user.plan)}>
                        {user.plan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-white">{user.joinDate}</TableCell>
                    <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
                    <TableCell className="text-white">{user.totalWatch}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => viewUser(user.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => editUser(user.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => sendEmail(user.id, user.email)}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => makeAdmin(user.id)}
                        >
                          <Shield className="h-4 w-4" />
                        </Button>
                        {user.status === "Active" ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => suspendUser(user.id)}
                          >
                            <Ban className="h-4 w-4" />
                          </Button>
                        ) : user.status === "Suspended" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => reactivateUser(user.id)}
                          >
                            Reactivate
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
