
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Upload, Plus, Trash2, Clock, CheckCircle, XCircle, Eye } from "lucide-react"
import { useState } from "react"

interface Episode {
  title: string
  file: File | null
  thumbnail: File | null
}

interface SeriesUpload {
  id: string
  title: string
  genre: string
  description: string
  episodes: Episode[]
  status: 'draft' | 'uploading' | 'completed' | 'failed'
  uploadDate: string
  totalEpisodes: number
  uploadedEpisodes: number
}

const mockUploadHistory: SeriesUpload[] = [
  {
    id: "1",
    title: "The Crown Season 5",
    genre: "Drama",
    description: "The story of Queen Elizabeth II",
    episodes: [],
    status: "completed",
    uploadDate: "2024-01-15",
    totalEpisodes: 10,
    uploadedEpisodes: 10
  },
  {
    id: "2",
    title: "Stranger Things 4",
    genre: "Sci-Fi",
    description: "Supernatural horror series",
    episodes: [],
    status: "uploading",
    uploadDate: "2024-01-20",
    totalEpisodes: 9,
    uploadedEpisodes: 6
  },
  {
    id: "3",
    title: "Money Heist Part 5",
    genre: "Crime",
    description: "Spanish heist crime drama",
    episodes: [],
    status: "failed",
    uploadDate: "2024-01-18",
    totalEpisodes: 10,
    uploadedEpisodes: 3
  }
]

export default function UploadSeries() {
  const [episodes, setEpisodes] = useState<Episode[]>([{ title: "", file: null, thumbnail: null }])
  const [seriesTitle, setSeriesTitle] = useState("")
  const [seriesGenre, setSeriesGenre] = useState("")
  const [seriesDescription, setSeriesDescription] = useState("")
  const [uploadHistory, setUploadHistory] = useState<SeriesUpload[]>(mockUploadHistory)
  const [activeTab, setActiveTab] = useState("upload")

  const addEpisode = () => {
    setEpisodes([...episodes, { title: "", file: null, thumbnail: null }])
  }

  const removeEpisode = (index: number) => {
    setEpisodes(episodes.filter((_, i) => i !== index))
  }

  const handleSeriesUpload = () => {
    const newSeries: SeriesUpload = {
      id: Date.now().toString(),
      title: seriesTitle,
      genre: seriesGenre,
      description: seriesDescription,
      episodes: episodes,
      status: 'uploading',
      uploadDate: new Date().toISOString().split('T')[0],
      totalEpisodes: episodes.length,
      uploadedEpisodes: 0
    }
    
    setUploadHistory([newSeries, ...uploadHistory])
    
    // Reset form
    setSeriesTitle("")
    setSeriesGenre("")
    setSeriesDescription("")
    setEpisodes([{ title: "", file: null, thumbnail: null }])
    
    // Switch to history tab
    setActiveTab("history")
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'uploading':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Completed</Badge>
      case 'uploading':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Uploading</Badge>
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="secondary">Draft</Badge>
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Upload Web Series</h1>
          <p className="text-muted-foreground mt-2">Upload new web series and manage your upload history</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card">
            <TabsTrigger value="upload">New Upload</TabsTrigger>
            <TabsTrigger value="history">Upload History</TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <Tabs defaultValue="series" className="space-y-6">
              <TabsList className="bg-card">
                <TabsTrigger value="series">Series Information</TabsTrigger>
                <TabsTrigger value="episodes">Episodes</TabsTrigger>
              </TabsList>

              <TabsContent value="series">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-white">Series Details</CardTitle>
                    <CardDescription>Add basic information about your web series</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <Input 
                          id="genre" 
                          placeholder="e.g., Drama, Comedy, Thriller" 
                          value={seriesGenre}
                          onChange={(e) => setSeriesGenre(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Enter series description..."
                        className="min-h-[120px]"
                        value={seriesDescription}
                        onChange={(e) => setSeriesDescription(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="poster">Series Poster</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Click to upload poster image</p>
                        <Input type="file" className="hidden" accept="image/*" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="episodes">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white">Episodes</h3>
                    <Button onClick={addEpisode} className="bg-accent hover:bg-accent/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Episode
                    </Button>
                  </div>

                  {episodes.map((episode, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-white">Episode {index + 1}</CardTitle>
                          {episodes.length > 1 && (
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => removeEpisode(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`episode-title-${index}`}>Episode Title</Label>
                          <Input 
                            id={`episode-title-${index}`} 
                            placeholder="Enter episode title" 
                            value={episode.title}
                            onChange={(e) => {
                              const newEpisodes = [...episodes]
                              newEpisodes[index].title = e.target.value
                              setEpisodes(newEpisodes)
                            }}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Video File</Label>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-muted-foreground/50 transition-colors">
                              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-1" />
                              <p className="text-sm text-muted-foreground">Upload video</p>
                              <Input type="file" className="hidden" accept="video/*" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Thumbnail</Label>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-muted-foreground/50 transition-colors">
                              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-1" />
                              <p className="text-sm text-muted-foreground">Upload thumbnail</p>
                              <Input type="file" className="hidden" accept="image/*" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-4">
              <Button variant="outline">Save as Draft</Button>
              <Button 
                className="bg-accent hover:bg-accent/90"
                onClick={handleSeriesUpload}
                disabled={!seriesTitle || !seriesGenre || episodes.some(ep => !ep.title)}
              >
                Upload Series
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">Upload History</CardTitle>
                    <CardDescription>Track all your series uploads and their status</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setActiveTab("upload")}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Upload
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Series</TableHead>
                      <TableHead>Genre</TableHead>
                      <TableHead>Episodes</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {uploadHistory.map((series) => (
                      <TableRow key={series.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium text-white">{series.title}</div>
                            <div className="text-sm text-muted-foreground line-clamp-1">{series.description}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-white">{series.genre}</TableCell>
                        <TableCell className="text-white">{series.totalEpisodes}</TableCell>
                        <TableCell className="text-white">{series.uploadDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(series.status)}
                            {getStatusBadge(series.status)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <div className="text-sm text-white">
                              {series.uploadedEpisodes}/{series.totalEpisodes} episodes
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-accent h-2 rounded-full transition-all"
                                style={{ 
                                  width: `${(series.uploadedEpisodes / series.totalEpisodes) * 100}%` 
                                }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {series.status === 'failed' && (
                              <Button variant="outline" size="sm">
                                Retry
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
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
