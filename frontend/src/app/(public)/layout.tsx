import Header from "@/components/custom/header";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      { children }
    </>
  )
}
