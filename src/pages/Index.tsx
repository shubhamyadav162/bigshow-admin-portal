
import { DashboardLayout } from "@/components/DashboardLayout"
import { DashboardCard } from "@/components/DashboardCard"
import { RecentTransactions } from "@/components/RecentTransactions"
import { UsersChart } from "@/components/UsersChart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Calendar, TrendingUp, Users, Video, DollarSign, Activity } from "lucide-react"

const Index = () => {
  const { toast } = useToast()

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your data export is being processed. You'll receive an email when it's ready.",
    })
  }

  const handleViewDetails = (metric: string) => {
    toast({
      title: "View Details",
      description: `Viewing detailed analytics for ${metric}`,
    })
  }

  const handleQuickAction = (action: string) => {
    toast({
      title: "Quick Action",
      description: `${action} action initiated`,
    })
  }

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleExportData}>
              Export Data
            </Button>
            <Button onClick={() => handleQuickAction("Refresh")}>
              Refresh
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard
            title="Total Revenue"
            value="₹45,231.89"
            description="+20.1% from last month"
            icon={DollarSign}
            trend="up"
          />
          <DashboardCard
            title="Active Users"
            value="2,350"
            description="+180.1% from last month"
            icon={Users}
            trend="up"
          />
          <DashboardCard
            title="Total Videos"
            value="12,234"
            description="+19% from last month"
            icon={Video}
            trend="up"
          />
          <DashboardCard
            title="Active Now"
            value="573"
            description="+201 since last hour"
            icon={Activity}
            trend="up"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <UsersChart />
          </div>
          <div className="col-span-3">
            <RecentTransactions />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Frequently used admin actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => handleQuickAction("Add New Series")}
              >
                Add New Series
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => handleQuickAction("Send Notification")}
              >
                Send Notification
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => handleQuickAction("Generate Report")}
              >
                Generate Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>
                Current system health
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Server Status</span>
                <Badge variant="default">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">CDN Status</span>
                <Badge variant="default">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <Badge variant="default">Connected</Badge>
              </div>
              <Button 
                size="sm" 
                className="w-full"
                onClick={() => handleViewDetails("System Health")}
              >
                View Details
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest platform activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="border-l-2 border-blue-500 pl-2">
                  <p className="font-medium">New user registered</p>
                  <p className="text-muted-foreground">2 minutes ago</p>
                </div>
                <div className="border-l-2 border-green-500 pl-2">
                  <p className="font-medium">Series uploaded</p>
                  <p className="text-muted-foreground">15 minutes ago</p>
                </div>
                <div className="border-l-2 border-orange-500 pl-2">
                  <p className="font-medium">Payment processed</p>
                  <p className="text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                className="w-full mt-3"
                onClick={() => handleViewDetails("Activity Log")}
              >
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Index
