
import { useState } from "react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { Upload, Plus, Trash2, Edit, Eye, Download } from "lucide-react"

interface Episode {
  id: string
  title: string
  description: string
  duration: string
  file: File | null
}

interface SeriesHistory {
  id: string
  title: string
  episodes: number
  status: "completed" | "uploading" | "processing" | "failed"
  uploadDate: string
  progress: number
}

export default function UploadSeries() {
  const { toast } = useToast()
  const [seriesTitle, setSeriesTitle] = useState("")
  const [seriesDescription, setSeriesDescription] = useState("")
  const [seriesGenre, setSeriesGenre] = useState("")
  const [episodes, setEpisodes] = useState<Episode[]>([
    { id: "1", title: "", description: "", duration: "", file: null }
  ])

  const [uploadHistory] = useState<SeriesHistory[]>([
    {
      id: "1",
      title: "Mystery Series Season 1",
      episodes: 10,
      status: "completed",
      uploadDate: "2024-01-15",
      progress: 100
    },
    {
      id: "2",
      title: "Action Adventure Series",
      episodes: 8,
      status: "uploading",
      uploadDate: "2024-01-20",
      progress: 65
    },
    {
      id: "3",
      title: "Drama Series Season 2",
      episodes: 12,
      status: "processing",
      uploadDate: "2024-01-22",
      progress: 90
    }
  ])

  const addEpisode = () => {
    const newEpisode = {
      id: String(episodes.length + 1),
      title: "",
      description: "",
      duration: "",
      file: null
    }
    setEpisodes([...episodes, newEpisode])
    toast({
      title: "Episode Added",
      description: "New episode slot added to the series"
    })
  }

  const removeEpisode = (id: string) => {
    if (episodes.length > 1) {
      setEpisodes(episodes.filter(ep => ep.id !== id))
      toast({
        title: "Episode Removed",
        description: "Episode removed from the series"
      })
    }
  }

  const updateEpisode = (id: string, field: keyof Episode, value: string | File) => {
    setEpisodes(episodes.map(ep => 
      ep.id === id ? { ...ep, [field]: value } : ep
    ))
  }

  const handleFileUpload = (id: string, file: File) => {
    updateEpisode(id, "file", file)
    toast({
      title: "File Selected",
      description: `${file.name} selected for episode ${id}`
    })
  }

  const uploadSeries = () => {
    if (!seriesTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a series title",
        variant: "destructive"
      })
      return
    }

    if (episodes.some(ep => !ep.title.trim())) {
      toast({
        title: "Error",
        description: "Please fill in all episode titles",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Upload Started",
      description: `${seriesTitle} is being uploaded with ${episodes.length} episodes`
    })

    // Reset form
    setSeriesTitle("")
    setSeriesDescription("")
    setSeriesGenre("")
    setEpisodes([{ id: "1", title: "", description: "", duration: "", file: null }])
  }

  const saveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your series draft has been saved"
    })
  }

  const previewSeries = () => {
    toast({
      title: "Preview Mode",
      description: "Opening series preview..."
    })
  }

  const downloadReport = () => {
    toast({
      title: "Downloading Report",
      description: "Upload history report is being generated"
    })
  }

  const retryUpload = (seriesId: string) => {
    toast({
      title: "Retry Upload",
      description: `Retrying upload for series ${seriesId}`
    })
  }

  const viewDetails = (seriesId: string) => {
    toast({
      title: "View Details",
      description: `Viewing details for series ${seriesId}`
    })
  }

  const editSeries = (seriesId: string) => {
    toast({
      title: "Edit Series",
      description: `Opening editor for series ${seriesId}`
    })
  }

  const deleteSeries = (seriesId: string) => {
    toast({
      title: "Delete Series",
      description: `Series ${seriesId} has been deleted`,
      variant: "destructive"
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "default"
      case "uploading": return "secondary"
      case "processing": return "outline"
      case "failed": return "destructive"
      default: return "outline"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Upload Series</h1>
            <p className="text-muted-foreground mt-2">Upload and manage your video series</p>
          </div>
          <Button onClick={downloadReport}>
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upload">New Upload</TabsTrigger>
            <TabsTrigger value="history">Upload History</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Series Information</CardTitle>
                <CardDescription>Enter the basic details for your series</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Series Title</Label>
                    <Input 
                      id="title" 
                      placeholder="Enter series title"
                      value={seriesTitle}
                      onChange={(e) => setSeriesTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="genre">Genre</Label>
                    <Select value={seriesGenre} onValueChange={setSeriesGenre}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="action">Action</SelectItem>
                        <SelectItem value="drama">Drama</SelectItem>
                        <SelectItem value="comedy">Comedy</SelectItem>
                        <SelectItem value="thriller">Thriller</SelectItem>
                        <SelectItem value="romance">Romance</SelectItem>
                        <SelectItem value="horror">Horror</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Enter series description"
                    value={seriesDescription}
                    onChange={(e) => setSeriesDescription(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Episodes</CardTitle>
                    <CardDescription>Add episodes to your series</CardDescription>
                  </div>
                  <Button onClick={addEpisode}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Episode
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {episodes.map((episode, index) => (
                  <div key={episode.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Episode {index + 1}</h4>
                      {episodes.length > 1 && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => removeEpisode(episode.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Episode Title</Label>
                        <Input 
                          placeholder="Episode title"
                          value={episode.title}
                          onChange={(e) => updateEpisode(episode.id, "title", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Duration (minutes)</Label>
                        <Input 
                          placeholder="Duration"
                          value={episode.duration}
                          onChange={(e) => updateEpisode(episode.id, "duration", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Video File</Label>
                        <Input 
                          type="file" 
                          accept="video/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleFileUpload(episode.id, file)
                          }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Episode Description</Label>
                      <Textarea 
                        placeholder="Episode description"
                        value={episode.description}
                        onChange={(e) => updateEpisode(episode.id, "description", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={saveDraft}>
                Save Draft
              </Button>
              <Button variant="outline" onClick={previewSeries}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={uploadSeries}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Series
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload History</CardTitle>
                <CardDescription>Track your series upload progress and status</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Series Title</TableHead>
                      <TableHead>Episodes</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {uploadHistory.map((series) => (
                      <TableRow key={series.id}>
                        <TableCell className="font-medium text-white">{series.title}</TableCell>
                        <TableCell>{series.episodes}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(series.status)}>
                            {series.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={series.progress} className="w-16" />
                            <span className="text-sm">{series.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{series.uploadDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => viewDetails(series.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => editSeries(series.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            {series.status === "failed" && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => retryUpload(series.id)}
                              >
                                Retry
                              </Button>
                            )}
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => deleteSeries(series.id)}
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
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
