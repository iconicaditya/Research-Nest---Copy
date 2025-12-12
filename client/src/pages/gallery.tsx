import { Layout } from "@/components/layout";
import heroImage from "@assets/generated_images/modern_bright_science_laboratory_with_equipment.png";
import networkImage from "@assets/generated_images/abstract_blue_network_data_visualization.png";
import dnaImage from "@assets/generated_images/abstract_dna_double_helix_structure.png";
import robotImage from "@assets/generated_images/robotic_arm_in_a_lab_setting.png";

const DEFAULT_IMAGES = [
  { src: heroImage, alt: "Lab Equipment" },
  { src: networkImage, alt: "Data Viz" },
  { src: dnaImage, alt: "DNA Structure" },
  { src: robotImage, alt: "Robotics" },
  { src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop", alt: "Microscope" },
  { src: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop", alt: "Cells" },
];

export default function Gallery() {
  return (
    <Layout>
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="font-serif text-4xl font-bold mb-4 text-primary">Gallery</h1>
          <p className="text-lg text-muted-foreground">
            A visual journey through our research facilities, experiments, and team events.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {DEFAULT_IMAGES.map((img, idx) => (
            <div key={idx} className="break-inside-avoid rounded-xl overflow-hidden group relative" data-testid={`gallery-image-${idx}`}>
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">{img.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
