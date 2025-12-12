import { AdminLayout } from "@/components/admin-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Upload, Trash2, Image as ImageIcon } from "lucide-react";
import heroImage from "@assets/generated_images/modern_bright_science_laboratory_with_equipment.png";
import networkImage from "@assets/generated_images/abstract_blue_network_data_visualization.png";
import dnaImage from "@assets/generated_images/abstract_dna_double_helix_structure.png";
import robotImage from "@assets/generated_images/robotic_arm_in_a_lab_setting.png";

const MOCK_IMAGES = [
  { id: 1, src: heroImage, name: "Lab Hero" },
  { id: 2, src: networkImage, name: "Network Viz" },
  { id: 3, src: dnaImage, name: "DNA Render" },
  { id: 4, src: robotImage, name: "Robot Arm" },
];

export default function AdminGallery() {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Media Gallery</h2>
          <p className="text-muted-foreground">Manage images and uploads.</p>
        </div>
        <Button className="gap-2">
          <Upload className="h-4 w-4" /> Upload Image
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {/* Upload Placeholder */}
        <div className="aspect-square rounded-xl border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 cursor-pointer transition-colors">
          <Upload className="h-8 w-8 mb-2" />
          <span className="text-sm font-medium">Upload New</span>
        </div>

        {MOCK_IMAGES.map((img) => (
          <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden border bg-muted">
            <img 
              src={img.src} 
              alt={img.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
              <p className="text-white text-xs font-medium truncate mb-2">{img.name}</p>
              <Button variant="destructive" size="sm" className="w-full h-8">
                <Trash2 className="h-3 w-3 mr-2" /> Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
