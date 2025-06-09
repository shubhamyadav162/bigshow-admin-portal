
import { DashboardLayout } from "@/components/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Plus, Trash2 } from "lucide-react"
import { useState } from "react"

export default function UploadSeries() {
  const [episodes, setEpisodes] = useState([{ title: "", file: null, thumbnail: null }])

  const addEpisode = () => {
    setEpisodes([...episodes, { title: "", file: null, thumbnail: null }])
  }

  const removeEpisode = (index: number) => {
    setEpisodes(episodes.filter((_, i) => i !== index))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Upload Web Series</h1>
          <p className="text-muted-foreground mt-2">Upload new web series and episodes to your platform</p>
        </div>

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
                    <Input id="title" placeholder="Enter series title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="genre">Genre</Label>
                    <Input id="genre" placeholder="e.g., Drama, Comedy, Thriller" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Enter series description..."
                    className="min-h-[120px]"
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
          <Button className="bg-accent hover:bg-accent/90">
            Upload Series
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
