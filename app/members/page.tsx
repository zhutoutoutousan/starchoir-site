import Layout from '../components/layout'
import Image from 'next/image'

const members = [
  { name: "方勇", role: "艺术总监及常任指挥" },
  { name: "黄湘", role: "艺术指导与指挥" },
  { name: "晋亮", role: "钢琴伴奏" },
  { name: "叶引弟", role: "声乐艺术指导" },
  // Add more members as needed
]

export default function Members() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">团员介绍</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, index) => (
          <div key={index} className="bg-white shadow rounded-lg p-6 text-center">
            <Image
              src={`/placeholder.svg?height=150&width=150&text=${member.name}`}
              alt={member.name}
              width={150}
              height={150}
              className="rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-gray-600">{member.role}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

