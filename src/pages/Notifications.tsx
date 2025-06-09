
import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { useToast } from "@/hooks/use-toast"
import { Bell, Calendar as CalendarIcon, Send, Clock, CheckCircle, XCircle, Edit, Trash2, Eye } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface NotificationRecord {
  id: string
  title: string
  type: "info" | "alert" | "update" | "promotional"
  message: string
  sentTimestamp: string
  status: "sent" | "scheduled" | "failed"
  targetUsers: string
  scheduledTime?: string
}

export default function Notifications() {
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [type, setType] = useState<string>("")
  const [targetAllUsers, setTargetAllUsers] = useState(true)
  const [scheduleDate, setScheduleDate] = useState<Date>()
  const [scheduleTime, setScheduleTime] = useState("")
  const [isScheduleOpen, setIsScheduleOpen] = useState(false)

  const [notifications, setNotifications] = useState<NotificationRecord[]>([
    {
      id: "1",
      title: "Welcome to BigShow Premium",
      type: "info",
      message: "Thank you for upgrading to Premium! Enjoy unlimited streaming.",
      sentTimestamp: "2024-01-20 14:30:00",
      status: "sent",
      targetUsers: "All Users"
    },
    {
      id: "2",
      title: "System Maintenance Alert",
      type: "alert",
      message: "Scheduled maintenance on Jan 25th from 2-4 AM IST.",
      sentTimestamp: "2024-01-22 09:15:00",
      status: "sent",
      targetUsers: "All Users"
    },
    {
      id: "3",
      title: "New Series Release",
      type: "update",
      message: "Check out our latest thriller series now available!",
      sentTimestamp: "2024-01-25 12:00:00",
      status: "scheduled",
      targetUsers: "Premium Users",
      scheduledTime: "2024-01-25 18:00:00"
    }
  ])

  const sendNotification = () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a notification title",
        variant: "destructive"
      })
      return
    }

    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Please enter a notification message",
        variant: "destructive"
      })
      return
    }

    if (!type) {
      toast({
        title: "Error",
        description: "Please select a notification type",
        variant: "destructive"
      })
      return
    }

    const newNotification: NotificationRecord = {
      id: String(notifications.length + 1),
      title,
      type: type as "info" | "alert" | "update" | "promotional",
      message,
      sentTimestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      status: scheduleDate ? "scheduled" : "sent",
      targetUsers: targetAllUsers ? "All Users" : "Selected Users",
      scheduledTime: scheduleDate && scheduleTime 
        ? `${format(scheduleDate, "yyyy-MM-dd")} ${scheduleTime}:00`
        : undefined
    }

    setNotifications([newNotification, ...notifications])

    const actionText = scheduleDate ? "scheduled" : "sent"
    toast({
      title: "Notification Sent",
      description: `Notification "${title}" has been ${actionText} successfully`
    })

    // Reset form
    setTitle("")
    setMessage("")
    setType("")
    setTargetAllUsers(true)
    setScheduleDate(undefined)
    setScheduleTime("")
  }

  const sendNow = () => {
    setScheduleDate(undefined)
    setScheduleTime("")
    sendNotification()
  }

  const scheduleNotification = () => {
    if (!scheduleDate || !scheduleTime) {
      toast({
        title: "Error",
        description: "Please select both date and time for scheduling",
        variant: "destructive"
      })
      return
    }
    sendNotification()
  }

  const saveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your notification draft has been saved"
    })
  }

  const previewNotification = () => {
    if (!title.trim() || !message.trim()) {
      toast({
        title: "Error",
        description: "Please enter title and message to preview",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Notification Preview",
      description: `Title: ${title}\nMessage: ${message}\nType: ${type}`
    })
  }

  const viewNotification = (notificationId: string) => {
    const notification = notifications.find(n => n.id === notificationId)
    if (notification) {
      toast({
        title: "View Notification",
        description: `Viewing details for: ${notification.title}`
      })
    }
  }

  const editNotification = (notificationId: string) => {
    const notification = notifications.find(n => n.id === notificationId)
    if (notification) {
      setTitle(notification.title)
      setMessage(notification.message)
      setType(notification.type)
      toast({
        title: "Edit Mode",
        description: `Editing notification: ${notification.title}`
      })
    }
  }

  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(n => n.id !== notificationId))
    toast({
      title: "Notification Deleted",
      description: "Notification has been deleted successfully"
    })
  }

  const resendNotification = (notificationId: string) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId 
        ? { ...n, status: "sent" as const, sentTimestamp: new Date().toISOString().replace('T', ' ').slice(0, 19) }
        : n
    ))
    toast({
      title: "Notification Resent",
      description: "Notification has been resent successfully"
    })
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "sent": return "default"
      case "scheduled": return "secondary"
      case "failed": return "destructive"
      default: return "outline"
    }
  }

  const getTypeVariant = (type: string) => {
    switch (type) {
      case "info": return "default"
      case "alert": return "destructive"
      case "update": return "secondary"
      case "promotional": return "outline"
      default: return "outline"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <Bell className="h-8 w-8" />
              Notifications
            </h1>
            <p className="text-muted-foreground mt-2">Send notifications to platform users</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Send Notification</CardTitle>
              <CardDescription>Create and send notifications to users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Notification Title</Label>
                <Input
                  id="title"
                  placeholder="Enter notification title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message Body</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your notification message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Notification Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select notification type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="alert">Alert</SelectItem>
                    <SelectItem value="update">Update</SelectItem>
                    <SelectItem value="promotional">Promotional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="target-all" 
                  checked={targetAllUsers}
                  onCheckedChange={(checked) => setTargetAllUsers(checked as boolean)}
                />
                <Label htmlFor="target-all">Target all users</Label>
              </div>

              <div className="space-y-2">
                <Label>Schedule Time (Optional)</Label>
                <div className="flex space-x-2">
                  <Popover open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !scheduleDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {scheduleDate ? format(scheduleDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={scheduleDate}
                        onSelect={(date) => {
                          setScheduleDate(date)
                          setIsScheduleOpen(false)
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-32"
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={saveDraft}>
                  Save Draft
                </Button>
                <Button variant="outline" onClick={previewNotification}>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                {scheduleDate ? (
                  <Button onClick={scheduleNotification}>
                    <Clock className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                ) : (
                  <Button onClick={sendNow}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Now
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>Notification delivery statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-400">156</div>
                  <div className="text-sm text-muted-foreground">Sent Today</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">12</div>
                  <div className="text-sm text-muted-foreground">Scheduled</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-white">2,847</div>
                  <div className="text-sm text-muted-foreground">Total Users</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-400">98.5%</div>
                  <div className="text-sm text-muted-foreground">Delivery Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Notification History</CardTitle>
            <CardDescription>View all sent and scheduled notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Sent/Scheduled</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notifications.map((notification) => (
                  <TableRow key={notification.id}>
                    <TableCell className="font-medium text-white">
                      {notification.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getTypeVariant(notification.type)}>
                        {notification.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(notification.status)}>
                        {notification.status === "sent" && <CheckCircle className="h-3 w-3 mr-1" />}
                        {notification.status === "scheduled" && <Clock className="h-3 w-3 mr-1" />}
                        {notification.status === "failed" && <XCircle className="h-3 w-3 mr-1" />}
                        {notification.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-white">{notification.targetUsers}</TableCell>
                    <TableCell className="text-white">
                      {notification.status === "scheduled" && notification.scheduledTime
                        ? notification.scheduledTime
                        : notification.sentTimestamp}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => viewNotification(notification.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => editNotification(notification.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {notification.status === "failed" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => resendNotification(notification.id)}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
