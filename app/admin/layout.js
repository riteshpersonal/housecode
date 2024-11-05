import DefaultLayout from "@/components/Admin/components/layout/DefaultLayout";
import "../globals.css";

export default function Layout({ children }) {
  return (
    <DefaultLayout>
      <div >
        <div className="dark:bg-boxdark-2 dark:text-bodydark">{children}</div>
      </div>
    </DefaultLayout>
  );
}
