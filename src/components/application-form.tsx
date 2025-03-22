"use client"

import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ApplicationForm() {
  return (
    <Card className="border-0 bg-primary/5 backdrop-blur-lg overflow-hidden">
      <CardContent className="p-8">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-primary/80">Full Name</label>
              <Input
                placeholder="Enter your full name"
                className="bg-primary/10 border-primary/20 text-white placeholder:text-primary/40 focus:border-primary/60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-primary/80">Email Address</label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                className="bg-primary/10 border-primary/20 text-white placeholder:text-primary/40 focus:border-primary/60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-primary/80">Phone Number</label>
              <Input
                placeholder="+966 XX XXX XXXX"
                className="bg-primary/10 border-primary/20 text-white placeholder:text-primary/40 focus:border-primary/60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-primary/80">Position</label>
              <Select>
                <SelectTrigger className="bg-primary/10 border-primary/20 text-white focus:border-primary/60">
                  <SelectValue placeholder="Select a position" />
                </SelectTrigger>
                <SelectContent className="bg-background border-primary/20 text-white">
                  <SelectItem value="water-engineer">Water Resource Engineer</SelectItem>
                  <SelectItem value="environmental-consultant">Environmental Consultant</SelectItem>
                  <SelectItem value="project-manager">Project Manager</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-primary/80">Cover Letter</label>
            <Textarea
              placeholder="Tell us why you're interested in joining Manara Water Consulting..."
              rows={5}
              className="bg-primary/10 border-primary/20 text-white placeholder:text-primary/40 focus:border-primary/60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-primary/80">Resume/CV</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-primary/20 border-dashed rounded-lg cursor-pointer bg-primary/10 hover:bg-primary/15 transition-colors duration-300">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <p className="mb-2 text-sm text-primary/70">Drag and drop your file here</p>
                  <p className="text-xs text-primary/50">PDF or DOC files up to 5MB</p>
                </div>
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              className="w-full py-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white border-0"
              size="lg"
            >
              <Send className="h-5 w-5 mr-2" />
              Submit Application
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  )
}

