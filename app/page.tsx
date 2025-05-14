import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BloodDropIcon } from "@/components/icons/blood-drop"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Footer } from "@/components/Footer"
import { WelcomeModal } from "@/components/WelcomeModal"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-950">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BloodDropIcon className="h-8 w-8 text-red-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            <span className="text-red-600">Blood</span>Bank
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link href="/login">
            <Button variant="outline">تسجيل الدخول</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
              <span className="text-red-600">نظام إدارة</span> بنك الدم
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              نظام متكامل لإدارة بنك الدم وتنظيم عمليات التبرع والمخزون وبيانات المتبرعين والمرضى
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/login">
                <Button size="lg" className="bg-red-600 hover:bg-red-700">
                  ابدأ الآن
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline">
                  تعرف علينا
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <img src="/placeholder.svg?height=400&width=500" alt="بنك الدم" className="rounded-lg shadow-xl" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">إدارة المتبرعين</h3>
            <p className="text-gray-600 dark:text-gray-300">
              تسجيل وتحديث وحذف بيانات المتبرعين وتصنيفهم حسب فصائل الدم
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">إدارة المخزون</h3>
            <p className="text-gray-600 dark:text-gray-300">
              متابعة مخزون الدم حسب الفصائل وإدارة عمليات السحب والإضافة
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">التقارير والإحصائيات</h3>
            <p className="text-gray-600 dark:text-gray-300">إنشاء تقارير مفصلة عن المتبرعين والمخزون وعمليات التبرع</p>
          </div>
        </div>
      </main>

      <Footer />
      <WelcomeModal />
    </div>
  )
}
