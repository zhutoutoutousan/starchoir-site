import Layout from '../components/layout'
import Image from 'next/image'

const images = [
  { src: "/placeholder.svg?height=300&width=400&text=Concert+1", alt: "Concert 1" },
  { src: "/placeholder.svg?height=300&width=400&text=Rehearsal", alt: "Rehearsal" },
  { src: "/placeholder.svg?height=300&width=400&text=Award+Ceremony", alt: "Award Ceremony" },
  { src: "/placeholder.svg?height=300&width=400&text=Group+Photo", alt: "Group Photo" },
  { src: "/placeholder.svg?height=300&width=400&text=Solo+Performance", alt: "Solo Performance" },
  { src: "/placeholder.svg?height=300&width=400&text=Concert+2", alt: "Concert 2" },
]

export default function Gallery() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">团员风采</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div key={index} className="relative h-64">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </Layout>
  )
}

