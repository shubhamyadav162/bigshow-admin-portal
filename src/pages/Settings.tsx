
import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Settings as SettingsIcon, Save, Key, Database, Bell, Shield, TestTube, RefreshCw, Download, Upload } from "lucide-react"

export default function Settings() {
  const { toast } = useToast()
  
  // General Settings State
  const [platformName, setPlatformName] = useState("BigShow")
  const [platformDescription, setPlatformDescription] = useState("Premium Video Streaming Platform")
  const [supportEmail, setSupportEmail] = useState("support@bigshow.com")
  const [timezone, setTimezone] = useState("Asia/Kolkata")
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  
  // Integration Settings State
  const [bunnyApiKey, setBunnyApiKey] = useState("")
  const [bunnyStorageZone, setBunnyStorageZone] = useState("")
  const [razorpayKeyId, setRazorpayKeyId] = useState("")
  const [razorpaySecret, setRazorpaySecret] = useState("")
  const [lightspeedApiKey, setLightspeedApiKey] = useState("")
  const [databaseUrl, setDatabaseUrl] = useState("")
  
  // Notification Settings State
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [marketingEmails, setMarketingEmails] = useState(true)
  
  // Security Settings State
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState("30")
  const [maxLoginAttempts, setMaxLoginAttempts] = useState("5")
  const [passwordPolicy, setPasswordPolicy] = useState("medium")

  const saveGeneralSettings = () => {
    toast({
      title: "Settings Saved",
      description: "General settings have been updated successfully"
    })
  }

  const saveIntegrationSettings = () => {
    toast({
      title: "Integration Settings Saved",
      description: "All integration settings have been updated successfully"
    })
  }

  const testBunnyConnection = () => {
    if (!bunnyApiKey) {
      toast({
        title: "Error",
        description: "Please enter Bunny.net API key first",
        variant: "destructive"
      })
      return
    }
    toast({
      title: "Testing Connection",
      description: "Testing Bunny.net connection..."
    })
    // Simulate test
    setTimeout(() => {
      toast({
        title: "Connection Successful",
        description: "Bunny.net connection is working properly"
      })
    }, 2000)
  }

  const testRazorpayConnection = () => {
    if (!razorpayKeyId || !razorpaySecret) {
      toast({
        title: "Error",
        description: "Please enter both Razorpay Key ID and Secret",
        variant: "destructive"
      })
      return
    }
    toast({
      title: "Testing Connection",
      description: "Testing Razorpay connection..."
    })
    setTimeout(() => {
      toast({
        title: "Connection Successful",
        description: "Razorpay connection is working properly"
      })
    }, 2000)
  }

  const testLightspeedConnection = () => {
    if (!lightspeedApiKey) {
      toast({
        title: "Error",
        description: "Please enter LightSpeed API key first",
        variant: "destructive"
      })
      return
    }
    toast({
      title: "Testing Connection",
      description: "Testing LightSpeed connection..."
    })
    setTimeout(() => {
      toast({
        title: "Connection Successful",
        description: "LightSpeed connection is working properly"
      })
    }, 2000)
  }

  const testDatabaseConnection = () => {
    if (!databaseUrl) {
      toast({
        title: "Error",
        description: "Please enter database URL first",
        variant: "destructive"
      })
      return
    }
    toast({
      title: "Testing Connection",
      description: "Testing database connection..."
    })
    setTimeout(() => {
      toast({
        title: "Connection Successful",
        description: "Database connection is working properly"
      })
    }, 2000)
  }

  const saveNotificationSettings = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Notification preferences have been updated"
    })
  }

  const saveSecuritySettings = () => {
    toast({
      title: "Security Settings Saved",
      description: "Security settings have been updated successfully"
    })
  }

  const generateApiKey = () => {
    const newKey = `bgs_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
    toast({
      title: "API Key Generated",
      description: `New API key: ${newKey}`
    })
  }

  const revokeAllSessions = () => {
    toast({
      title: "Sessions Revoked",
      description: "All active user sessions have been revoked"
    })
  }

  const clearCache = () => {
    toast({
      title: "Cache Cleared",
      description: "Application cache has been cleared successfully"
    })
  }

  const backupDatabase = () => {
    toast({
      title: "Backup Started",
      description: "Database backup is being created. You'll receive an email when complete."
    })
  }

  const restoreDatabase = () => {
    toast({
      title: "Restore Database",
      description: "Please select a backup file to restore"
    })
  }

  const exportSettings = () => {
    toast({
      title: "Settings Exported",
      description: "Configuration settings have been exported successfully"
    })
  }

  const importSettings = () => {
    toast({
      title: "Import Settings",
      description: "Please select a settings file to import"
    })
  }

  const resetToDefaults = () => {
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values"
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              <SettingsIcon className="h-8 w-8" />
              Settings
            </h1>
            <p className="text-muted-foreground mt-2">Manage platform configuration and preferences</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={exportSettings}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" onClick={importSettings}>
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Information</CardTitle>
                <CardDescription>Basic platform configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform-name">Platform Name</Label>
                    <Input
                      id="platform-name"
                      value={platformName}
                      onChange={(e) => setPlatformName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="support-email">Support Email</Label>
                    <Input
                      id="support-email"
                      type="email"
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform-description">Platform Description</Label>
                  <Textarea
                    id="platform-description"
                    value={platformDescription}
                    onChange={(e) => setPlatformDescription(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Default Timezone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                        <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                        <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between space-x-2 pt-6">
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    <Switch
                      id="maintenance-mode"
                      checked={maintenanceMode}
                      onCheckedChange={setMaintenanceMode}
                    />
                  </div>
                </div>
                <Button onClick={saveGeneralSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  Save General Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bunny.net CDN Configuration</CardTitle>
                <CardDescription>Configure video streaming and storage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bunny-api">API Key</Label>
                    <Input
                      id="bunny-api"
                      type="password"
                      placeholder="Enter Bunny.net API key"
                      value={bunnyApiKey}
                      onChange={(e) => setBunnyApiKey(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bunny-storage">Storage Zone</Label>
                    <Input
                      id="bunny-storage"
                      placeholder="Enter storage zone name"
                      value={bunnyStorageZone}
                      onChange={(e) => setBunnyStorageZone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={testBunnyConnection}>
                    <TestTube className="h-4 w-4 mr-2" />
                    Test Connection
                  </Button>
                  <Badge variant="secondary">Status: Connected</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Gateway Configuration</CardTitle>
                <CardDescription>Configure payment processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Razorpay Configuration</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="razorpay-key">Key ID</Label>
                      <Input
                        id="razorpay-key"
                        placeholder="Enter Razorpay Key ID"
                        value={razorpayKeyId}
                        onChange={(e) => setRazorpayKeyId(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="razorpay-secret">Secret</Label>
                      <Input
                        id="razorpay-secret"
                        type="password"
                        placeholder="Enter Razorpay Secret"
                        value={razorpaySecret}
                        onChange={(e) => setRazorpaySecret(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button onClick={testRazorpayConnection}>
                    <TestTube className="h-4 w-4 mr-2" />
                    Test Razorpay
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">LightSpeed Configuration</h4>
                  <div className="space-y-2">
                    <Label htmlFor="lightspeed-api">API Key</Label>
                    <Input
                      id="lightspeed-api"
                      type="password"
                      placeholder="Enter LightSpeed API key"
                      value={lightspeedApiKey}
                      onChange={(e) => setLightspeedApiKey(e.target.value)}
                    />
                  </div>
                  <Button onClick={testLightspeedConnection}>
                    <TestTube className="h-4 w-4 mr-2" />
                    Test LightSpeed
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Database Configuration</CardTitle>
                <CardDescription>Configure database connection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="database-url">Database URL</Label>
                  <Input
                    id="database-url"
                    type="password"
                    placeholder="Enter database connection URL"
                    value={databaseUrl}
                    onChange={(e) => setDatabaseUrl(e.target.value)}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={testDatabaseConnection}>
                    <Database className="h-4 w-4 mr-2" />
                    Test Connection
                  </Button>
                  <Badge variant="default">Status: Connected</Badge>
                </div>
                <Button onClick={saveIntegrationSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Integration Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={smsNotifications}
                      onCheckedChange={setSmsNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing-emails">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Receive promotional emails</p>
                    </div>
                    <Switch
                      id="marketing-emails"
                      checked={marketingEmails}
                      onCheckedChange={setMarketingEmails}
                    />
                  </div>
                </div>
                <Button onClick={saveNotificationSettings}>
                  <Bell className="h-4 w-4 mr-2" />
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Configuration</CardTitle>
                <CardDescription>Configure security settings and policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Enable 2FA for admin accounts</p>
                    </div>
                    <Switch
                      id="two-factor"
                      checked={twoFactorAuth}
                      onCheckedChange={setTwoFactorAuth}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                      <Input
                        id="session-timeout"
                        type="number"
                        value={sessionTimeout}
                        onChange={(e) => setSessionTimeout(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-attempts">Max Login Attempts</Label>
                      <Input
                        id="max-attempts"
                        type="number"
                        value={maxLoginAttempts}
                        onChange={(e) => setMaxLoginAttempts(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-policy">Password Policy</Label>
                    <Select value={passwordPolicy} onValueChange={setPasswordPolicy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - 6 characters minimum</SelectItem>
                        <SelectItem value="medium">Medium - 8 characters with mixed case</SelectItem>
                        <SelectItem value="high">High - 12 characters with special chars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={saveSecuritySettings}>
                    <Shield className="h-4 w-4 mr-2" />
                    Save Security Settings
                  </Button>
                  <Button variant="outline" onClick={generateApiKey}>
                    <Key className="h-4 w-4 mr-2" />
                    Generate API Key
                  </Button>
                  <Button variant="outline" onClick={revokeAllSessions}>
                    Revoke All Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Maintenance</CardTitle>
                <CardDescription>Advanced system operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" onClick={clearCache}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Clear Cache
                  </Button>
                  <Button variant="outline" onClick={backupDatabase}>
                    <Download className="h-4 w-4 mr-2" />
                    Backup Database
                  </Button>
                  <Button variant="outline" onClick={restoreDatabase}>
                    <Upload className="h-4 w-4 mr-2" />
                    Restore Database
                  </Button>
                  <Button variant="destructive" onClick={resetToDefaults}>
                    Reset to Defaults
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
                <CardDescription>Current system status and information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="font-medium">Version</div>
                    <div className="text-muted-foreground">v2.1.0</div>
                  </div>
                  <div>
                    <div className="font-medium">Uptime</div>
                    <div className="text-muted-foreground">15 days, 3h</div>
                  </div>
                  <div>
                    <div className="font-medium">Storage Used</div>
                    <div className="text-muted-foreground">2.4 TB / 5 TB</div>
                  </div>
                  <div>
                    <div className="font-medium">Active Users</div>
                    <div className="text-muted-foreground">2,847</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
