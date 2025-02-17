import Layout from '../components/layout'
import Link from 'next/link'

const posts = [
  { title: "我们的第一场演出", date: "2024-07-15", slug: "first-concert" },
  { title: "获得上海职工合唱大赛第二名", date: "2024-09-20", slug: "choir-competition" },
  { title: "国庆75周年演出回顾", date: "2024-10-05", slug: "national-day-performance" },
]

export default function Blog() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">博客</h1>
      <div className="space-y-6">
        {posts.map((post, index) => (
          <div key={index} className="border-b pb-4">
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600">{post.date}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

