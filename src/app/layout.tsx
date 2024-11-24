import "../styles/globals.css";

export const metadata = {
  title: "Task Management Dashboard",
  description: "Manage your tasks efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-gray-900">
        <div className="max-w-4xl mx-auto p-6">{children}</div>
      </body>
    </html>
  );
}
