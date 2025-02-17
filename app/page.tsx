import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main>
      {/* Hero Section with Big Typography */}
      <div className="relative h-screen w-full">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url("/choir.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'contrast(1.2) brightness(0.8)'
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>

        {/* Content Container - Adjusted padding-top to account for navbar */}
        <div className="relative z-10 h-full flex flex-col items-start justify-center 
          px-8 md:px-16 max-w-7xl mx-auto">
          <div className="space-y-6">
            <h1 className="text-8xl md:text-9xl font-black text-white tracking-tight">
              声音的
              <span className="block text-9xl md:text-[12rem] bg-gradient-to-r from-yellow-400 to-orange-500 
                text-transparent bg-clip-text transform -mt-4">交响</span>
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 max-w-2xl font-light leading-relaxed">
              汇聚热爱音乐的心灵，让我们用歌声传递情感，用和声创造美好。
            </p>
            
            <div className="flex gap-6 mt-8">
              <button className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 
                text-black text-xl font-bold rounded-lg hover:scale-105 transition-all duration-300">
                加入我们
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-xl 
                font-bold rounded-lg hover:bg-white/20 transition-all duration-300">
                了解更多
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Brutal Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* About Section */}
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-yellow-400 mb-6">星扬合唱团</h3>
              <p className="text-white/80">
                上海星扬室内合唱团成立于2024年6月，是一支汇聚众多音乐爱好者与专业人士的青年精英团体。
              </p>
              <div className="flex gap-4 mt-4">
                <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-6">快速链接</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-white/80 hover:text-yellow-400 transition-colors">
                    关于我们
                  </Link>
                </li>
                <li>
                  <Link href="/performances" className="text-white/80 hover:text-yellow-400 transition-colors">
                    演出安排
                  </Link>
                </li>
                <li>
                  <Link href="/join" className="text-white/80 hover:text-yellow-400 transition-colors">
                    加入我们
                  </Link>
                </li>
                <li>
                  <Link href="/sponsor" className="text-white/80 hover:text-yellow-400 transition-colors">
                    支持我们
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-6">联系我们</h3>
              <div className="space-y-3 text-white/80">
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +86 123 4567 8900
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  contact@xingyangchoir.com
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  上海市某区某街道某号
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="border-t-4 border-white/20 pt-8">
            <p className="text-center text-white/60">
              © 2024 上海星扬室内合唱团. 保留所有权利.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}

// Add this to your global CSS file
const styles = `
  .shadow-brutal {
    box-shadow: 8px 8px 0px 0px rgba(0,0,0,1);
  }
`;

