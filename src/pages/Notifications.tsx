
import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { CalendarIcon, Send, Clock, CheckCircle, AlertCircle, Info, Megaphone } from "lucide-react"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface NotificationFormData {
  title: string
  message: string
  type: "info" | "alert" | "update" | "promotional"
  targetAllUsers: boolean
  scheduleTime?: Date
}

interface NotificationRecord {
  id: string
  title: string
  type: "info" | "alert" | "update" | "promotional"
  sentAt: string
  status: "sent" | "scheduled" | "failed"
}

const mockNotifications: NotificationRecord[] = [
  {
    id: "1",
    title: "New Season Available",
    type: "update",
    sentAt: "2024-01-15 14:30:00",
    status: "sent"
  },
  {
    id: "2", 
    title: "Server Maintenance Alert",
    type: "alert",
    sentAt: "2024-01-14 10:00:00",
    status: "sent"
  },
  {
    id: "3",
    title: "Special Discount Offer",
    type: "promotional", 
    sentAt: "2024-01-16 18:00:00",
    status: "scheduled"
  }
]

const notificationIcons = {
  info: Info,
  alert: AlertCircle,
  update: CheckCircle,
  promotional: Megaphone
}

const statusColors = {
  sent: "bg-green-600",
  scheduled: "bg-blue-600", 
  failed: "bg-red-600"
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationRecord[]>(mockNotifications)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<NotificationFormData>({
    defaultValues: {
      title: "",
      message: "",
      type: "info",
      targetAllUsers: true,
      scheduleTime: undefined
    }
  })

  const onSubmit = async (data: NotificationFormData) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call - Replace with actual Supabase integration
      console.log("Sending notification:", data)
      
      // Create new notification record
      const newNotification: NotificationRecord = {
        id: Date.now().toString(),
        title: data.title,
        type: data.type,
        sentAt: data.scheduleTime ? format(data.scheduleTime, "yyyy-MM-dd HH:mm:ss") : format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        status: data.scheduleTime ? "scheduled" : "sent"
      }
      
      // Add to notifications list
      setNotifications(prev => [newNotification, ...prev])
      
      // Reset form
      form.reset()
      
      toast.success(
        data.scheduleTime 
          ? "Notification scheduled successfully!" 
          : "Notification sent successfully!"
      )
      
    } catch (error) {
      console.error("Error sending notification:", error)
      toast.error("Failed to send notification. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      sent: "default",
      scheduled: "secondary", 
      failed: "destructive"
    } as const
    
    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>
  }

  const getTypeIcon = (type: keyof typeof notificationIcons) => {
    const Icon = notificationIcons[type]
    return <Icon className="h-4 w-4" />
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
          <p className="text-muted-foreground">Send notifications to all users</p>
        </div>

        {/* Notification Form */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Send New Notification</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notification Title</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter notification title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notification Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select notification type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="info">
                            <div className="flex items-center gap-2">
                              <Info className="h-4 w-4" />
                              Info
                            </div>
                          </SelectItem>
                          <SelectItem value="alert">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="h-4 w-4" />
                              Alert
                            </div>
                          </SelectItem>
                          <SelectItem value="update">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Update
                            </div>
                          </SelectItem>
                          <SelectItem value="promotional">
                            <div className="flex items-center gap-2">
                              <Megaphone className="h-4 w-4" />
                              Promotional
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                rules={{ required: "Message is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message Body</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter your notification message"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row gap-6">
                <FormField
                  control={form.control}
                  name="targetAllUsers"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Target all users</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="scheduleTime"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Schedule Time (Optional)</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP HH:mm")
                              ) : (
                                <span>Pick a date & time</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Now
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Notifications History */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Notification History</h2>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Sent Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notifications.map((notification) => (
                  <TableRow key={notification.id}>
                    <TableCell className="font-medium">
                      {notification.title}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(notification.type)}
                        <span className="capitalize">{notification.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>{notification.sentAt}</TableCell>
                    <TableCell>
                      {getStatusBadge(notification.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
